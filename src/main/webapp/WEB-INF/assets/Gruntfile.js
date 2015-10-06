var toCamelCase = function (string) {
  var camelCaseString = '';
  string.split('_').forEach(function (item, index) {
    if (index === 0) {
      camelCaseString = item.toLowerCase();
      return;
    }
    camelCaseString += item.charAt(0).toUpperCase() + item.substring(1).toLowerCase();
  });
  return camelCaseString;
};

module.exports = function (grunt) {

  grunt.initConfig({
    includeSource: {
      options: {
        basePath: './',
        baseUrl: 'static/',
        templates: {
          html: {
            js: '<script type="text/javascript" charset="UTF-8" src="{filePath}"></script>',
            css: '<link type="text/css" rel="stylesheet" href="{filePath}"/>'
          }
        }
      },
      js: {
        files: {
          'index.html': 'index.tpl.html'
        }
      }
    },
    bower: {
      install: {
        options: {
          install: true,
          verbose: true,
          copy: false
        }
      }
    },
    clean: {
      dist: ['dist/'],
      css: ['dist/css/styles.css'],
      js: ['dist/js/scripts.js', 'dist/js/scripts.min.js', 'dist/lib/libs.js', 'dist/js/templates.js', 'dist/js/templates.min.js']
    },
    jshint: {
      options: {
        curly: false,
        eqeqeq: false,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: false,
        unused: false,
        boss: true,
        eqnull: false,
        browser: true,
        noempty: true,
        trailing: true,
        globals: {
          jQuery: true
        }
      },
      dist: ['js/**/*.js']
    },
    concat: {
      css: {
        src: ["css/jquery-ui.min.css",
              "bower_components/font-awesome/css/font-awesome.min.css",
              "bower_components/bootstrap/dist/css/bootstrap.min.css",
              "bower_components/angular-veasy-table/dist/css/veasy-table.min.css",
              "bower_components/ng-sortable/dist/ng-sortable.css",
              "bower_components/textAngular/dist/textAngular.css",
              "bower_components/fuelux/dist/css/fuelux.css",
              "bower_components/font-awesome/css/font-awesome.css",
              "bower_components/hover/css/hover.css",
              "bower_components/simple-line-icons/css/simple-line-icons.css",
              "bower_components/animate-css/animate.css",
              "bower_components/ngtoast/dist/ngToast.css",
              "bower_components/angular-gridster/dist/angular-gridster.min.css",
              "css/main.css",
              "css/report.css",
              "css/docs.min.css",
              "css/bs-docs-sidebar.css"
              ],
        dest: 'dist/css/styles.css'
      },
      js: {
        src: ['js/**/**/*.js'],
        dest: 'dist/js/scripts.js'
      },
      browser: {
        src: [
          'lib/browservalidator/bowser.min.js',
          'lib/browservalidator/browservalidator.js'
        ],
        dest: 'dist/js/browser.min.js'
      },
      lib: {
        src: [
          'bower_components/jquery/jquery.min.js',
          'bower_components/jquery-ui/ui/minified/jquery-ui.min.js',
          'bower_components/angular/angular.min.js',
          'bower_components/angular-animate/angular-animate.min.js',
          'bower_components/angular-route/angular-route.min.js',
          'bower_components/angular-sanitize/angular-sanitize.min.js',
          'bower_components/angular-cookies/angular-cookies.js',
          'bower_components/angular-translate/angular-translate.min.js',
          'bower_components/angular-i18n/angular-locale_pt-br.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/underscore/underscore.js',
          'bower_components/ngtoast/dist/ngToast.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/angular-bootstrap/ui-bootstrap.min.js',
          'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
          'bower_components/angular-resource/angular-resource.js',
          'bower_components/fuelux/dist/js/fuelux.js',
          'bower_components/highcharts/highcharts.js',
          'bower_components/highmaps/modules/data.js',
          'bower_components/highmaps/modules/map.js',
          'bower_components/ng-sortable/dist/ng-sortable.js',
          'bower_components/angular-veasy-table/src/veasy-table.js',
          'bower_components/angular-veasy-table/dist/js/veasy-table-tpls.min.js',
          'bower_components/textAngular/dist/textAngular-rangy.min.js',
          'bower_components/textAngular/dist/textAngular-sanitize.min.js',
          'bower_components/textAngular/dist/textAngular.min.js',
          'bower_components/angular-gridster/src/angular-gridster.js',
          'bower_components/javascript-detect-element-resize/jquery.resize.js',
          'lib/highcharts-mapdata/br-all.js',
          'lib/date/date.js',
          'lib/angular-mask/angular-mask.js',
          'lib/angular-date-mask/angular-date-mask.js',
          'lib/angular-money-mask/angular-money-mask.js',
          'lib/angular-text-limit/angular-text-limit.js',
          'lib/angular-case-sensitivity/angular-case-sensitivity.js',
          'lib/api/api.js',
          'lib/api/ngApi.js'
        ],
        dest: 'dist/lib/libs.js'
      },
      all: {
        src: ['dist/lib/libs.js', 'dist/js/scripts.min.js', 'dist/js/templates.min.js'],
        dest: 'dist/js/vision.min.js'
      }
    },
    uglify: {
      scripts: {
        src: ['dist/js/scripts.js'],
        dest: 'dist/js/scripts.min.js'
      },
      templates: {
        src: ['dist/js/templates.js'],
        dest: 'dist/js/templates.min.js'
      }
    },
    htmlmin: {
      all: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files:[
          {'dist/index.html':'index-production.html'},
          {'dist/redirect.html':'redirect.html'}
        ]
      }
    },
    cssmin: {
      all: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'dist/css/vision.min.css': ['dist/css/styles.css'],
          'dist/css/report.min.css': ['css/bootstrap.min.css']
        }
      }
    },
    copy: {
      fonts: {
        expand: true,
        cwd: 'bower_components/font-awesome/fonts/',
        src: ['**'],
        dest: 'fonts/'
      },
      folders: {
        src: ['fonts/**', 'img/**', 'partials/**/*'],
        dest: 'dist/'
      }
    },
    karma: {
      all : {
        configFile: 'karma.conf.js',
      }
    },
    html2js: {
      options: {
        module: 'visionView',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        singleModule: true,
        rename: function (moduleName) {
          return toCamelCase(moduleName.replace('.html', '').replace('../', ''));
        }
      },
      main: {
        src: ['view/*.html', 'js/directive/**/*.html'],
        dest: 'dist/js/templates.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('dist',  ['bower:install', 'clean:dist', 'concat:css', 'cssmin', 'clean:css', 'html2js', 'concat:js', 'concat:browser', 'concat:lib', 'uglify', 'concat:all', 'clean:js', 'copy:fonts', 'copy:folders', 'htmlmin']);
  grunt.registerTask('dev',   ['bower:install', 'clean', 'includeSource', 'html2js']);

}
