﻿
(function () {
	'use strict';

	var Q = require('Q');
	var google = require('googleapis');
	var config = require('./../config.json');
	var uuid = require('node-uuid');

	var ScheduleService = function (authClient) {
		this._calendar = google.calendar({
			version: 'v3',
			auth: authClient
		});
		this._channelId = uuid.v4();
	};

	ScheduleService.prototype.getEvents = function () {
		var eventsDeferred = Q.defer();
		this._calendar.events.list({
			calendarId: config.calendar_id
		}, this.handleEvent.bind(this, eventsDeferred));
		return eventsDeferred.promise;
	};

	ScheduleService.prototype.handleEvent = function (eventsDeferred, errors, response) {
		console.trace(arguments);
		if (errors !== null) {
			console.error(errors);
			eventsDeferred.reject(errors);
		}
		eventsDeferred.resolve(response);
	};

	module.exports = ScheduleService;

}());