'use strickt';

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	var fs = require('fs');
	var _ = require('lodash');
	var inline = function(path) {
		var text = fs.readFileSync(__dirname + '/dest/' + path);

		return _.template(text)(this);
	};

	grunt.initConfig({
		uglify: {
			compress: {
				files: [{
					expand: true,
					cwd: 'src',
					dest: 'dest',
					src: ['js/*.js', 'views/js/*.js']
				}]
			}
		},

		cssmin: {
			compress: {
				files: [{
					expand: true,
					cwd: 'src',
					dest: 'dest',
					src: ['css/*.css', 'views/css/*.css']
				}]
			}
		},

		responsive_images: {
			options: {
				engine: 'im',
				quality: 70,
				sizes: [
					{
						name: 'quarter',
						width: '25%'
					},
					{
						name: 'half',
						width: '50%'
					},
					{
						name: 'origin',
						width: '100%'
					}
				]
			},
			general: {
				files: [{
					expand: true,
					cwd: 'src',
					dest: 'dest',
					src: [
						'img/*.jpg', 'img/*.png',
						'views/images/*.png', 'views/images/*.jpg'
					]
				}]
			}
		},

		template: {
			dist: {
				options: {
					data: {
						inline: inline
					}
				},
				files: [{
					expand: true,
					cwd: 'src',
					dest: 'dest',
					src: ['*_improved.html']
				}]
			}
		},

		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'src',
						dest: 'dest',
						src: ['icons/*']
					},
					{
						'dest/index.html': 'dest/index_improved.html',
						'dest/project-2048.html': 'dest/project-2048_improved.html',
						'dest/project-mobile.html': 'dest/project-mobile_improved.html',
						'dest/project-webperf.html': 'dest/project-webperf_improved.html',

						'dest/js/perfmatters.js': 'dest/js/perfmatters_improved.js',

						'dest/img/2048.png': 'dest/img/2048-origin.png',
						'dest/img/cam_be_like.jpg': 'dest/img/cam_be_like-origin.jpg',
						'dest/img/mobilewebdev.jpg': 'dest/img/mobilewebdev-origin.jpg',
						'dest/img/profilepic.jpg': 'dest/img/profilepic_optimized-origin.jpg',
						'dest/views/images/pizza.png': 'dest/views/images/pizza-origin.png',
						'dest/views/images/pizzeria.jpg': 'dest/views/images/pizzeria_optimized-origin.jpg',
					}
				]
			}
		},

		clean: {
			build: {
				src: ['dest']
			}
		},

		pagespeed: {
			options: {
				nokey: true,
				locale: 'en_Gb',
				threshold: 1
			},
			local: {
				options: {
					strategy: 'desktop'
				}
			},
			mobile: {
				options: {
					strategy: 'mobile'
				}
			}
		}
	});

	grunt.registerTask('speed', 'Run pagespeed with ngrok', function(url){
		grunt.config.set('pagespeed.options.url', url);
		grunt.task.run('pagespeed');
	});

	grunt.registerTask('default', ['clean', 'uglify', 'cssmin', 'template', 'responsive_images', 'copy']);
};
