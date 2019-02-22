'use strict';

module.exports = function () {
  $.gulp.task('copy:image', function () {
    return $.gulp.src('./src/assets/images/**/*.*', {since: $.gulp.lastRun('copy:image')})
      .pipe($.gp.imagemin({
        optimizationLevel: 3,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        interlaced: true
      }))
      .pipe($.gulp.dest($.config.root + '/assets/images'));
  });
};
