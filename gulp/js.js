var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    transform   = require('vinyl-transform'),
    browserify  = require('browserify'),
    path        = require('path'),
    rename      = require('gulp-rename');

var importDefaults = {
  install: function(less, pluginManager) {
    pluginManager.addPreProcessor({
      process: function (css, extra) {
        return "@import 'node_modules/helpers.less/helpers.less'; @import 'config.less';" + css;
      }
    });
  }
};

module.exports = function() {
  return gulp.src('./app/**/entry.js')
    .pipe(transform(function(filename) {
      return browserify(filename, {
        insertGlobals: true,
        debug: true
      })
        .transform(require('jadeify'))
        .transform(require('lessify'), {
          plugins: [importDefaults]
        })
        .bundle();
    }))
    .on('error', gutil.log)
    .on('error', gutil.beep)
    .pipe(rename(function (file) {
      // Name file after directory
      file.basename = path.resolve('./app/'+file.dirname).split('/').reverse()[0];
      file.dirname = '.';
    }))
    .pipe(gulp.dest('./build'))
};
