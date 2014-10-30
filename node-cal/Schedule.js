// todo: inject
var Auth = require('./Auth');
var google = require('googleapis');
var config = require('./config.json');

var Schedule = function (authClient) {
    this._calendar = google.calendar({
        version: 'v3',
        auth: authClient
    });
};

Schedule.prototype.subscribe = function () {
    this._calendar.events.watch({
        calendarId: config.calendar_id
    }, this.handleEvent.bind(this));
};

Schedule.prototype.handleEvent = function () {
    console.trace(arguments);
};

module.exports = Schedule;