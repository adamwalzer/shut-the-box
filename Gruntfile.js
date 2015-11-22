module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          "js/app.js": "js/app.jsx"
        }
      }
    },
    sass: {
      dist: {
        options: {
          outputStyle: 'compressed',
          sourceMap: true
        },
        files: {
          'css/main.css': 'css/main.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded',
          sourceMap: true
        },
        files: {
          'css/main.css': 'css/main.scss'
        }
      }
    },
    watch: {
      compile: {
        files: [
          'css/*.scss',
          'css/partials/*.scss',
          'js/app.jsx'
        ],
        tasks: ['sass:dev','babel:dist']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'css/main.css'
        ]
      },
    }
  });
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');
  grunt.registerTask('default',['watch']);
};