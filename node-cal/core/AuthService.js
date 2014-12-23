﻿﻿(function () {
	'use strict';

	var Q = require('Q');
	var credentials = require('./../google-api.json');
	var google = require('googleapis');

	var AuthService = function () {
		this._scopes = credentials.scopes;
		this.client = new google.auth.OAuth2(
			credentials.client_id,
			credentials.client_secret,
			credentials.redirect_uri
		);
	};

	Auth.getCode = function(newUrl) {
		var codeWord = 'code=';
		var codeStart = newUrl.lastIndexOf(codeWord);

		if (codeStart < 0) {
			return;
		}

		return newUrl.substr(codeStart + codeWord.length);
	};

	Auth.prototype.getUrl = function () {
		return this.client.generateAuthUrl({
			access_type: 'offline',
			scope: this._scopes
		});
	};

	AuthService.prototype.handleGetToken = function (deferred, err, tokens) {
		console.trace(arguments);

		if (err) {
			console.error(err);
			deferred.reject();
		}

		this.client.setCredentials(tokens);
		deferred.resolve();
	};

	AuthService.prototype.setToken = function (code) {
		var tokenDeferred = Q.defer();
		this.client.getToken(code, this.handleGetToken.bind(this, tokenDeferred));
		return tokenDeferred.promise;
	};

	module.exports = AuthService;

})();