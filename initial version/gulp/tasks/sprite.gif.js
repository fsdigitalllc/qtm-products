'use strict';

module.exports = function () {

  $.gulp.task('sprite:gif', function () {
    return $.gulp.src('./src/assets/sprite/*.gif')
      .pipe($.gp.plumber())
      .pipe($.spritesmith({
        imgName: 'sprite.gif',
        cssName: 'sprite-gif.css'
      }))
      .pipe($.gulp.dest($.config.root + '/assets/images/sprite'));
  });

};
