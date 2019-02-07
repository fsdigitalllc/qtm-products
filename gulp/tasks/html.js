'use strict';

var fileinclude = require('gulp-file-include');

module.exports = function() {
  $.gulp.task('html', function() {
    return $.gulp.src('./src/*.{htm,html}')
      .pipe(fileinclude({
        prefix: '@@',
        basepath: './src/'
      }))
      .pipe($.gulp.dest($.config.root))
  })
};
