var _credentials = require('./google-api.json');
var google = require('googleapis');

var Auth = function () {
    this._scopes = [
        'https://www.googleapis.com/auth/calendar'
    ];
    this.client = new google.auth.OAuth2(
        _credentials.client_id, 
        _credentials.client_secret, 
        _credentials.redirect_uri
    );
};

Auth.prototype.getUrl = function () {
    return this.client.generateAuthUrl({
        access_type: 'offline',
        scope: this._scopes
    });
};

Auth.prototype.setToken = function (code) {
    this.client.getToken(code, function (err, tokens) {
        if (!err) {
            this.client.setCredentials(tokens);
        }
    });
};

module.exports = Auth;

