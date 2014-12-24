'use strict';
define([
		'app',
		'controllers/main'
	],
	function (app) {
		app.config([
			'$routeProvider', '$locationProvider',
			function ($routeProvider, $locationProvider) {
				$routeProvider.otherwise({
					controller: 'MainCtrl',
					templateUrl: 'views/calendar.html'
				});
			}
		]);
		return app;
	}
);