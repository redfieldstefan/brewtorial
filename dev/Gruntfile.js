module.exports = function(grunt) {

  // configure grunt.
  grunt.file.defaultEncoding = 'utf8';
  grunt.file.setBase('..');
  var path = require("path");

  // load npm tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  var bldFiles=['Gruntfile.js', './app/**/*.js', './app/**/*.css'];

  // configure tasks.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['dev/Gruntfile.js'],
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/../app/js/client.js',
        output: {
          path: path.join(__dirname, '../build'),
          filename: 'bundle.js'
        }
      },
      karma_test: {
        entry: __dirname + '/../test/karma_tests/karma_entry.js',
        output: {
          path: 'test/karma_tests/',
          filename: 'bundle.js'
        }
      }
    },

    copy: {
      html: {
        cwd: 'app/',
        expand: true,
        flatten: false,
        src:'**/*.html',
        dest: 'build/',
        filter: 'isFile'
      },
      css: {
        cwd: 'app/styles',
        expand: true,
        flatten: false,
        src:'**/*.css',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    },

    simplemocha:{
      dev:{
        src:['../test/**/*test.js']
      }
    },

    nodemon: {
      dev: {
        src: bldFiles
      }
    },

    watch: {
      files: bldFiles,
      html: {
                files: ['./app/**/*.html'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['./app/**/*.css'],
                options: {
                    livereload: true
                }
            },
      tasks: ['webpack:client', 'copy:html', 'copy:css']
    }
  });

  // register tasks.
  grunt.registerTask('default', ['jshint', 'build']);
  grunt.registerTask('test',  ['simplemocha:dev'])
  grunt.registerTask('build:dev', ['webpack:client', 'webpack:karma_test', 'copy:html', 'copy:css']);
  grunt.registerTask('build', ['build:dev']);
};
