/*jslint white:true*/
/*global
	module
*/
module.exports = function(grunt) {

	'use strict';

	// Project configuration.
	grunt.initConfig({
		buster: {
			test: {
				config: 'test/buster.js'
			},
			server: {
				port: 1111
			}
		}
	});

	grunt.loadNpmTasks('grunt-buster');
	grunt.registerTask('test', ['buster']);

	// Default task.
	grunt.registerTask('default', 'test');
};
