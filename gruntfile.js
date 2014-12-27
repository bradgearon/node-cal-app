module.exports = function (grunt) {
	"use strict";

	require('load-grunt-tasks')(grunt);
	var lr = require('connect-livereload')();

	grunt.initConfig({
		connect: {
			ui: {
				options: {
					livereload: true,
					port: 9000,
					open: '/ui',
					base: './',
					middleware: function(connect, options, middlewareFns) {
						return [lr].concat(middlewareFns);
					}
				}
			}
		},
		watch: {
			grunt: {
				files: [ 'Gruntfile.js' ],
				options: {
					reload: true
				}
			},
			ui: {
				files: ['**/*.js', '**/*.html', '**/*.css'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.registerTask('default', function(){
		grunt.task.run(['connect', 'watch']);
	});

};