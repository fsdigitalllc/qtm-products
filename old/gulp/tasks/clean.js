'use strict';

module.exports = function () {
  $.gulp.task('clean', function (cb) {
    return $.del([
        $.config.root + '/assets/css',
        $.config.root + '/assets/js',
        $.config.root + '/assets/images',
        $.config.root + '/assets/fonts'
      ]
      , cb);
  });
};

