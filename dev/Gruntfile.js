module.exports = function(grunt) {

  // configure grunt.
  grunt.file.defaultEncoding = 'utf8';
  grunt.file.setBase('../');

  // load npm tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');

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
    }
  });

  // register tasks.
  grunt.registerTask('default', ['jshint']);

};