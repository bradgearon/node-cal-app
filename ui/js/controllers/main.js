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
					console.log(schedule);
					angular.extend(scope.schedule, schedule);
				});
			});

			scope.$watch('schedule', function(val) {
				$log.debug(val);
			});

		}]);
	}
);