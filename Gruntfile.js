module.exports = function(grunt) {

  // configure grunt.
  grunt.file.defaultEncoding = 'utf8';
  var path = require('path');
  var webpack = require('webpack');
  // load npm tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');

  var watchFiles = ['Gruntfile.js','./client/**/*.js', './client/**/*.scss', './client/**/*.html'];

  // configure tasks.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        node: true,
      },
      server: {
        src: ['Gruntfile.js', 'routes/**/*.js', 'models/**/*.js', 'server.js']
      },
      client: {
        src: ['app/**/*.js'],
        options: {
          globals: {
            angular: true,
            document: true
          }
        }
      },
      mocha: {
        src: ['test/*test.js'],
        options: {
          globals: {
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true
          }
        }
      },
      jasmine: {
        src: ['test/karma_tests/*test.js'],
        options: {
          globals: {
            angular: true,
            describe: true,
            it: true,
            before: true,
            beforeEach: true,
            after: true,
            afterEach: true,
            expect: true,
            $scope: true
          }
        }
      }
    },

    webpack: {
      client: {
        entry: __dirname + '/client/js/client.js',
        output: {
          path: path.join(__dirname, '/build'),
          filename: 'bundle.min.js'
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({minimize: true})
        ]
      },
      karma_test: {
        entry: __dirname + '/test/karma_tests/karma_entry.js',
        output: {
          path: 'test/karma_tests/',
          filename: 'bundle.js'
        }
      }
    },

    karma: {
      test: {
        configFile:'./karma.conf.js'
      }
    },

    copy: {
      html: {
        cwd: 'client/',
        expand: true,
        flatten: false,
        src:'**/*.html',
        dest: 'build/',
        filter: 'isFile'
      },
      images: {
        cwd: 'client/',
        expand: true,
        flatten: false,
        src: 'images/**/*',
        dest: 'build/'
      }
    },

    sass: {
      dist: {
        options: {
          sourcemap: 'none'
        },
        files: {
          'build/css/style.css': 'client/styles/style.scss'
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          // App styles: have already been built (by Sass) into `build/css/style.css`
          expand: true,
          cwd: 'build/css/',
          src: 'style.css',
          dest: 'build/css/',
          ext: '.min.css'
        }, {
          // Third-party styles: not built by Sass, are pulled in from `client/styles/lib/`
          expand: true,
          cwd: 'client/styles/lib/',
          src: '**/*.css',
          dest: 'build/css/',
          ext: '.min.css'
        }]
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    },

    simplemocha: {
      dev:{
        src: ['./test/*test.js']
      }
    },

    nodemon: {
      dev: {
        src: watchFiles
      }
    },

    watch: {
      files: watchFiles,
      html: {
        files: ['./client/**/*.html'],
        options: {
          livereload: true
        }
      },
      css: {
        files: ['./client/**/*.scss'],
        options: {
          livereload: true
        }
      },
      tasks: ['build']
    }

  });

  // register tasks.
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('test',  ['simplemocha:dev', 'karma']);
  grunt.registerTask('build:test', ['webpack:karma_test']);
  grunt.registerTask('build:dev', [ 'webpack:client', 'copy:html', 'copy:images', 'sass', 'cssmin']);
  grunt.registerTask('build', ['build:dev']);
  grunt.registerTask('am', ['build:dev', 'watch']);
};
