var gulp = require('gulp');

module.exports = function() {
  gulp.src(['./site/**/[a-zA-Z0-9]!(*.js|*.jade|*.less)']) //[a-zA-Z0-9]*!(.js|.jade|.less)
    .pipe(gulp.dest('./build'));
};
