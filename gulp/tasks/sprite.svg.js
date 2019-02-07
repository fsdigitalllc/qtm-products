'use strict';

module.exports = function () {

  var config = {
    mode: {
      symbol: {
        dest: './',     //base directory
        sprite: 'svg-sprite.svg',          //Sprite location
        render: {
          scss: {
            dest: '../../src/assets/scss/common/_svg_sprite.scss', //CSS stylesheet location,
            template: './src/assets/scss/vendor/_sprite_template.scss'
          }
        }
      }
    }
  };

  $.gulp.task('sprite:svg', function () {
    return $.gulp.src('./src/assets/sprite/*.svg')
      .pipe($.gp.plumber())
      .pipe($.gp.imagemin({
        svgoPlugins: [{removeViewBox: false}]
      }))
      .pipe($.gp.svgmin({
        js2svg: {
          pretty: true
        }
      }))
      .pipe($.gp.cheerio({
        run: function ($) {
          $('[style]').removeAttr('style');
          $('[stroke]').removeAttr('stroke');
        },
        parserOptions: {
          xmlMode: true
        }
      }))
      .pipe($.gp.replace('&gt;', '>'))
      .pipe($.gp.svgSprite(config))
      .pipe($.gulp.dest($.config.root + '/assets/images'))
      .pipe($.browserSync.stream());
  })
};
