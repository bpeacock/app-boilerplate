var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    path    = require('path')
    less    = require('gulp-less'),
    concat  = require('gulp-concat-util');

module.exports = function() {
  gulp.src('./site/**/[a-zA-Z0-9]*.less')
    .on('error', gutil.log)
    .on('error', gutil.beep)
    .pipe(concat.header("@import 'node_modules/helpers.less/helpers.less'; @import 'config.less';"))
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./build'));
};
