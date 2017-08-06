'use strict';

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		mochaTests: ['app/tests/**/*.js']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverJS: {
				files: watchFiles.serverJS,
				//tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
  	jshint: {
		all: {
			src: watchFiles.serverJS,
			options: {
				"node": true
			}
		}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverJS
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': 8080,
					'web-host': '127.0.0.1',
					'debug-port': 5858,
					'save-live-edit': true,
					'no-preload': true,
					'stack-trace-limit': 50,
					'hidden': []
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch', 'node-inspector'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test',
				PORT: 3000
			},
			secure: {
				NODE_ENV: 'secure'
			},
			development: {
				NODE_ENV: 'development'
			}
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);

	// A Task for loading the configuration   object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')();
		var config = require('./config/config');

	});

	// Default task(s).
	grunt.registerTask('default', ['env:development', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['env:development', 'concurrent:debug']);

	// Secure task(s).
	//grunt.registerTask('secure', ['env:secure', 'concurrent:default']);

	// Build task(s).
	//grunt.registerTask('build', ['loadConfig']);

	// Test task.
	//grunt.registerTask('test', ['env:test', 'mochaTest']);

};