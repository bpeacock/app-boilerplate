var gulp  = require('gulp'),
    _     = require('underscore');

var defaultTasks = ['html', 'css', 'js', 'static'];

_.each(defaultTasks, function(task) {
  gulp.task(task, require('./gulp/'+task));
});

gulp.task('default', defaultTasks);

gulp.task('watch', function() {
  gulp.watch(['app/**/*', 'config.js', 'config.less'], function() {
    gulp.start('default');
  });
});
