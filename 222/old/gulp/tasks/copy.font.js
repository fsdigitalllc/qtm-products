'use strict';

module.exports = function () {
  $.gulp.task('copy:font', function () {
    return $.gulp.src('./src/assets/fonts/**/*.*', {since: $.gulp.lastRun('copy:font')})
      .pipe($.gulp.dest($.config.root + '/assets/fonts'));
  });
};
