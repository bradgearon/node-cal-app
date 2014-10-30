var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

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
    var Schedule = require('./Schedule');
    var Auth = require('./Auth');

    // Create the browser window.
    mainWindow = new BrowserWindow({});
    mainWindow.setFullScreen(true);
    
    var auth = new Auth();
    var url = auth.getUrl();
    debugger;
    mainWindow.webContents.on('did-finish-load', function (event) {
        console.trace(arguments);
        var newUrl = mainWindow.getUrl();
        var codeStart = newUrl.lastIndexOf('code=');
        if (codeStart > 0) {
            console.trace('redirect', arguments);
            var code = newUrl.substr(codeStart);
            auth.setToken(code);
            var schedule = new Schedule(auth.client);
        }
    });

    mainWindow.loadUrl(url);
    

    
    
    
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
