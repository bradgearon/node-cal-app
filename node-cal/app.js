(function () {
	'use strict';

	// Module to control application life.
	var app = require('app');

	// Module to create native browser window.
	var BrowserWindow = require('browser-window');

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
		var Schedule = require('./core/ScheduleService');
		var Auth = require('./core/AuthService');

		// Create the browser window.
		mainWindow = new BrowserWindow({});
		mainWindow.setFullScreen(true);

		var auth = new AuthService();
		var url = auth.getUrl();
		var hasToken = Q.defer();
		var subscribed = Q.defer();

		var handleFinishLoad = function (event) {
			var newUrl = mainWindow.getUrl();
			var codeStart = newUrl.lastIndexOf('code=');

			if (codeStart < 0) {
				hasToken.reject(newUrl);
				return;
			}

			var code = newUrl.substr(codeStart);
			hasToken.resolve(code);
		};

		var handleTokenSet = function () {
			var schedule = new ScheduleService(auth.client);
			try {
				var promise = schedule.getEvents();
				subscribed.resolve(promise);
			} catch (err) {
				subscribed.reject(err);
			}
		};

		var handleCode = function (code) {
			code = code.substr(5);
			auth.setToken(code)
				.then(handleTokenSet);
		};

		var handleCodeError = function (url) {
			console.error('invalid auth redirect: '.url);
		};

		var handleSubscribe = function (promise) {
			promise.then(function (data) {
				console.trace(data);
			});
			mainWindow.loadUrl('file://' + __dirname + '/index.html');
		};

		var handleSubscribeError = function (err) {
			console.error(err);
		};

		mainWindow.webContents
			.on('did-finish-load', handleFinishLoad);

		mainWindow.loadUrl(url);

		Q.when(hasToken.promise)
			.then(handleCode, handleCodeError);

		Q.when(subscribed.promise)
			.then(handleSubscribe, handleSubscribeError);

		mainWindow.on('closed', function () {
			mainWindow = null;
		});
	});

}());