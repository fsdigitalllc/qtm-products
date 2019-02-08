'use strict';

module.exports = function() {
  $.gulp.task('js:process', function() {
    return $.gulp.src($.path.app)
      .pipe($.gp.plumber())
      .pipe($.gp.concat('app.js'))
      .pipe($.gp.babel())
      .pipe($.gp.uglify())
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};
