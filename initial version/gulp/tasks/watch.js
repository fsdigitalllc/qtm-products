'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./src/assets/js/**/*.js', $.gulp.series('js:process'));
    $.gulp.watch('./src/**/*.html', $.gulp.series('html'));
    $.gulp.watch('./src/assets/scss/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./src/assets/sprite/**/*.*', $.gulp.series('sprite:svg'));
    $.gulp.watch('./src/assets/sprite/**/*.*', $.gulp.series('sprite:png'));
    $.gulp.watch('./src/assets/sprite/**/*.*', $.gulp.series('sprite:gif'));
    $.gulp.watch('./src/assets/images/**/*.*', $.gulp.series('copy:image'));
    $.gulp.watch('./src/assets/fonts/**/*.*', $.gulp.series('copy:font'));
  });
};
