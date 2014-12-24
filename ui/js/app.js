'use strict'
define([
	'angular'
], function (angular) {
	var cal = angular.module('calApp', [
		'ng',
		'ngResource',
		'ngRoute',
		'ngMaterial'
	]);

	return cal;
});