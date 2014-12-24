'use strict';
define([
		'app',
		'angular'
	],
	function (app, angular) {
		var ipc = require('ipc');
		app.controller('MainCtrl', ['$scope', '$log', function (scope, $log) {
			scope.schedule = { };
			ipc.on('schedule', function (schedule) {
				scope.$apply(function () {
					angular.extend(scope.schedule, schedule.data);
				});
			});

			scope.$watch('schedule', function(val) {
				$log.debug(val);
			});

		}]);
	}
);