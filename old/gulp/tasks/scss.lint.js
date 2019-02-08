'use strict';

var scsslint = require('gulp-scss-lint');

module.exports = function() {
  $.gulp.task('scss:lint', function() {
    return $.gulp.src('./src/assets/scss/**/*.scss')
      .pipe($.gp.plumber())
      .pipe(scsslint({ 'config': 'scss-lint.yml' }))
      .pipe(scsslint.failReporter());
  })
};
