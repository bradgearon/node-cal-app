'use strict';
define([
		'app',
		'angular',
		'lodash'
	],
	function (app, angular, _) {
		var ipc = require('ipc');
		app.controller('MainCtrl', ['$scope', '$log', function (scope, $log) {
			scope.schedule = { };

			ipc.on('schedule', function (schedule) {
				scope.$apply(function () {
					console.log(schedule);
					angular.extend(scope.schedule, schedule);
				});
			});

			scope.$watch('schedule.data', function(val) {
				var values = _.values(val);
				if(values && values.length > 0) {
					scope.item = values[0];
				}
			});

		}]);
	}
);