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
		var Schedule = require('./core/Schedule');
		var Auth = require('./core/Auth');

		// Create the browser window.
		mainWindow = new BrowserWindow({});
		mainWindow.setFullScreen(true);

		var auth = new Auth();
		var url = auth.getUrl();
		var tokenDeferred = Q.defer();
		var subscribeDeferred = Q.defer();

		var handleFinishLoad = function (event) {
			var newUrl = mainWindow.getUrl();
			var codeStart = newUrl.lastIndexOf('code=');

			if (codeStart < 0) {
				return;
			}

			var code = newUrl.substr(codeStart);
			tokenDeferred.resolve(code);
		};

		var handleTokenSet = function () {
			var schedule = new Schedule(auth.client);
			try {
				var promise = schedule.getEvents();
				subscribeDeferred.resolve(promise);
			} catch (err) {
				subscribeDeferred.reject(err);
			}
		};

		var handleCode = function (code) {
			code = code.substr(5);
			console.trace(arguments);
			auth.setToken(code)
				.then(handleTokenSet);
		};

		var handleSubscribe = function (promise) {
			promise.then(function(data){
				console.trace(data);
			});
			mainWindow.loadUrl('file://' + __dirname + '/index.html');
		};

		var handleSubscribeError = function (err) {
			console.error(err);
		};

		mainWindow.webContents.on('did-finish-load', handleFinishLoad);
		mainWindow.loadUrl(url);

		Q.when(tokenDeferred.promise).then(handleCode); //error state?
		Q.when(subscribeDeferred.promise).then(handleSubscribe, handleSubscribeError);

		// var schedule = new Schedule(auth.client);

		// and load the index.html of the app.
		// ADD: app interface and functions here
		// mainWindow.loadUrl('file://' + __dirname + '/index.html');


		// Emitted when the window is closed.
		mainWindow.on('closed', function () {

			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			mainWindow = null;
		});
	});

}());