'use strict';
module.exports = function(grunt) {
  // Initialize
  grunt.loadNpmTasks('grunt-contrib-qunit');

  grunt.initConfig({
    qunit: {
      all: ["test.html"]
    }
  });

  // Register default tasks
  grunt.registerTask('default', 'qunit');
  // Register travis tasks
  grunt.registerTask('travis', 'qunit');
}
