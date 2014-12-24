/**
 * Created by Brad on 12/23/2014.
 */
requirejs
	.config({
		baseUrl: 'js',
		paths: {
			'angular': '../bower_components/angular/angular.min',
			'angular-route': '../bower_components/angular-route/angular-route.min',
			'angular-resource': '../bower_components/angular-resource/angular-resource.min',
			'angular-material': '../bower_components/angular-material/angular-material.min',
			'angular-aria': '../bower_components/angular-aria/angular-aria.min',
			'angular-animate': '../bower_components/angular-animate/angular-animate.min',
			'hammer': '../bower_components/hammerjs/hammer.min',
			'lodash': '../bower_components/lodash/dist/lodash.min'
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
			'hammer' : {
				exports: 'Hammer'
			},
			'angular-material': {
				deps: [
					'hammer',
					'angular-aria',
					'angular-animate'
				],
				exports: 'angular'
			},
			'lodash': {
				exports: '_'
			}
		}
	});