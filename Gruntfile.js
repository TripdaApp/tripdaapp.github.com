module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        mangle: false
      },
      js: {
        files: {
          'src/js/main.min.js': ['bower_components/jquery/dist/jquery.min.js', 'src/js/main.js']
        }
      },
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'src/css/main.min.css': ['src/css/normalize.css', 'src/css/main.css']
        }
      }
    },
    shell: {
      jekyllBuild: {
        command: 'jekyll build'
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      css: {
        files: ['src/css/**/*.css'],
        tasks: ['cssmin', 'shell']
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['uglify', 'shell']
      },
      html: {
        files: ['**/*.html', '!./node_modules/*.html'],
        tasks: ['shell'],
        options: {
          spawn: false,
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: './_site'
        }
      }
    },

  });

  grunt.registerTask('dev', ['cssmin', 'uglify', 'shell', 'connect', 'watch']);
  grunt.registerTask('default', ['dev']);
};