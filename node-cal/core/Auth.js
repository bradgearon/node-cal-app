﻿(function () {
	'use strict';

	var Q = require('Q');
	var credentials = require('./../google-api.json');
	var google = require('googleapis');

	var Auth = function () {
		this._scopes = [
			'https://www.googleapis.com/auth/calendar'
		];
		this.client = new google.auth.OAuth2(
			credentials.client_id,
			credentials.client_secret,
			credentials.redirect_uri
		);
	};

	Auth.prototype.getUrl = function () {
		return this.client.generateAuthUrl({
			access_type: 'offline',
			scope: this._scopes
		});
	};

	Auth.prototype.handleGetToken = function (deferred, err, tokens) {
		console.trace(arguments);

		if (err) {
			console.error(err);
			deferred.reject();
		}

		this.client.setCredentials(tokens);
		deferred.resolve();
	};

	Auth.prototype.setToken = function (code) {
		var tokenDeferred = Q.defer();
		this.client.getToken(code, this.handleGetToken.bind(this, tokenDeferred));
		return tokenDeferred.promise;
	};

	module.exports = Auth;

})();