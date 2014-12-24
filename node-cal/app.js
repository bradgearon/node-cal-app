(function () {
	'use strict';

	// Module to control application life.
	var app = require('app');
	var path = require('path');
	var parseArgs = require('minimist');
	var argv = parseArgs(process.argv);

	var md5 = require('MD5');

	// Module to create native browser window.
	var BrowserWindow = require('browser-window');

	// inter
	var ipc = require('ipc');

	var Q = require('q');

	// Report crashes to our server.
	require('crash-reporter').start();

	// Keep a global reference of the window object, if you don't, the window will
	// be closed automatically when the javascript object is GCed.
	var mainWindow = null;


	// Quit when all windows are closed.
	app.on('window-all-closed', function () {
		app.quit();
	});

	// This method will be called when atom-shell has done everything
	// initialization and ready for creating browser windows.
	app.on('ready', function () {
		var ScheduleService = require('./core/ScheduleService');
		var AuthService = require('./core/AuthService');

		// Create the browser window.
		mainWindow = new BrowserWindow({});
		mainWindow.setFullScreen(true);

		var schedule = { data: { }};

		var auth = new AuthService();
		var url = auth.getUrl();
		var tokenDeferred = Q.defer();
		var subscribeDeferred = Q.defer();

		var setSchedule = function () {
			console.log('send schedule', schedule);
			mainWindow.webContents.send('schedule', schedule);
		};

		var loadMain = function () {
			var indexPath = path.join('file://', __dirname, '/../ui', '/index.html');
			mainWindow.webContents.on('did-finish-load', setSchedule);
			mainWindow.loadUrl(indexPath);
		};

		var handleFinishLoad = function (event) {
			var newUrl = mainWindow.getUrl();
			var code = AuthService.getCode(newUrl);
			if (!code) {
				return;
			}
			mainWindow.webContents.removeListener('did-finish-load', handleFinishLoad);
			if (!/file\:/.test(newUrl)) {
				loadMain();
				tokenDeferred.resolve(code);
			}
		};

		var handleTokenSet = function () {
			var schedule = new ScheduleService(auth.client);
			try {
				var promise = schedule.getEvents();
				subscribeDeferred.resolve(promise);
			} catch (err) {
				subscribeDeferred.reject(err);
			}
		};

		var handleCode = function (code) {
			auth.setToken(code)
				.then(handleTokenSet);
		};

		var handleCodeError = function (url) {
			console.error('invalid auth redirect: '.url);
		};

		var handleSubscribe = function (data) {
			var fs = require('fs');
			var _ = require('lodash-node');

			schedule = _.assign(schedule, data);
			_.map(data.items, function (item) {
				console.log('item');
				if (item.id !== null && item.id.length > 0) {
					schedule.data[item.id] = item;
				}
				var email = item.organizer.email;
				item.gravatarImageUrl = 'http://www.gravatar.com/avatar/' + md5(email);
			});
			delete schedule.items;

			fs.writeFileSync('data.json', JSON.stringify(data), { encoding: 'utf8' });
			mainWindow.webContents.on('did-finish-load', setSchedule);
		};

		var handleSubscribeError = function (err) {
			console.error(err);
		};

		console.log(argv.debug);

		if (!argv.debug) {
			mainWindow.webContents.on('did-finish-load', handleFinishLoad);
			mainWindow.loadUrl(url);
			Q.when(tokenDeferred.promise).then(handleCode, handleCodeError); //error state?
			Q.when(subscribeDeferred.promise).then(handleSubscribe, handleSubscribeError);
		} else {
			mainWindow.openDevTools();
			loadMain();
			var data = require('../data.json');
			schedule = data;
			handleSubscribe(data);
		}

		mainWindow.on('closed', function () {
			mainWindow = null;
		});
	});

}());