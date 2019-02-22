'use strict';

module.exports = function () {

  $.gulp.task('sprite:png', function () {
    return $.gulp.src('./src/assets/sprite/*.png')
      .pipe($.gp.plumber())
      .pipe($.spritesmith({
        retinaSrcFilter: './src/assets/sprite/*@2x.png',
        imgName: 'sprite.png',
        retinaImgName: 'sprite@2x.png',
        cssName: 'sprite-png.css',
        padding: 10
      }))
      .pipe($.gulp.dest($.config.root + '/assets/images/sprite'));
  });


};
