module.exports = function(grunt) {

  // configure grunt.
  grunt.file.defaultEncoding = 'utf8';
  grunt.file.setBase('..');
  var path = require("path");

  // load npm tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

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
          path: path.join(__dirname, '../', 'build'),
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
      }
    },

    clean: {
      dev: {
        src: 'build/'
      }
    }
  });

  // register tasks.
  grunt.registerTask('default', ['jshint', 'build']);
  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
  grunt.registerTask('build', ['build:dev']);
};
