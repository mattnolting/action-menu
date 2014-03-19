'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		tag: {
			banner: '/*!\n' +
				' * <%= pkg.title %>\n' +
				' * <%= pkg.description %>\n' +
				' * <%= pkg.url %>\n' +
				' * @author <%= pkg.author %> <<%= pkg.email %>>\n' +
				' * @version <%= pkg.version %>\n' +
				' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
				' */\n'
		},


		project: {
			css: ['css'],
			sass: ['css/sass'],
			images: ['img'],
			fonts: ['fonts'],
			js: ['js']
		},

		compass: {
			dist: {
				options: {
					basePath: '<%= project.app %>',
					sassDir: '<%= project.sass %>',
					cssDir: '<%= project.css %>',
					imagesDir: '<%= project.images %>',
					fontsDir: '<%= project.fonts %>',
					httpGeneratedImagesPath: '../img',
					outputStyle: 'expanded',
					noLineComments: true,
					raw: 'preferred_syntax = :scss\n'
				}
			}
		},


		/**
		 * CSSMin
		 * CSS minification
		 * https://github.com/gruntjs/grunt-contrib-cssmin
		 */
		cssmin: {
			add_banner: {
				options: {
					banner: '<%= tag.banner %>',
					keepSpecialComments: 0
				},
				files: {
					// '<%= project.css %>/lte-ie8.min.css': ['<%= project.css %>/lte-ie8.css'],
					// '<%= project.css %>/print.min.css': ['<%= project.css %>/print.css'],
					'<%= project.css %>/style.min.css': ['<%= project.css %>/style.css']
				}
			}
		},


		watch: {
			css: {
				files: '<%= project.sass %>/**/*',
				tasks: ['compass', 'cssmin'],
				options: {
					livereload: true
				},
			},
		},
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Default task.
	/**
	 * Default task
	 * Run `grunt` on the command line
	 */
	grunt.registerTask('default', ['bower', 'uglify', 'compass', 'autoprefixer', 'cssmin']);

	/**
	 * Image Optimization task
	 * Run `grunt optim` on the command line
	 */
	grunt.registerTask('optim', ['imagemin']);

};

