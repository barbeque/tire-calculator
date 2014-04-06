'use strict';
module.exports = function(grunt) {
  // Initialize
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.initConfig({
    qunit: {
      all: ["test.html"]
    }
  });

  grunt.event.on('qunit.spawn', function(url) {
    grunt.log.ok('running tests from url ' + url);
  });
  grunt.event.on('qunit.begin', function() {
    grunt.log.ok('beginning qunit');
  });
  grunt.event.on('qunit.moduleStart', function(name) {
    grunt.log.ok('entering module ' + name);
  });
  grunt.event.on('qunit.testStart', function(name) {
    grunt.log.ok('starting test ' + name);
  });

  // Register default tasks
  grunt.registerTask('default', 'qunit');
  // Register travis tasks
  grunt.registerTask('travis', 'qunit');
}
