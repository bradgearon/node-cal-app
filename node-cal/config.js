/**
 * Created by Brad on 12/23/2014.
 */
requirejs
	.config({
		paths: {
			'angular': 'bower_components/angular/angular.min',
			'angular-route': 'bower_components/angular-route/angular-route.min',
			'angular-resource': 'bower_components/angular-resource/angular-resource.min',
			'lodash': 'bower_components/lodash/dist/lodash.min'
		},
		shim: {
			'angular': {
				exports: 'angular'
			},
			'angular-route': {
				deps: ['angular']
			},
			'angular-resource': {
				deps: ['angular']
			},
			'lodash': {
				exports: '_'
			}
		}
	});