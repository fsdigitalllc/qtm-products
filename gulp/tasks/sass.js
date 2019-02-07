'use strict';

var scsslint = require('gulp-scss-lint');

module.exports = function() {
  $.gulp.task('sass', function() {
    return $.gulp.src([
        './src/assets/scss/style.scss',
        './src/assets/scss/style-2.scss',
        './src/assets/scss/common/*.scss',
        './src/assets/scss/blocks/*.scss',
        './src/assets/scss/widgets/*.scss'
    ])
      .pipe($.gp.plumber())
      .pipe($.gp.sourcemaps.init())
      .pipe(scsslint({ 'config': 'scss-lint.yml' }))
      .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
      .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
      // .pipe($.cssunit({type : 'px-to-rem', rootSize : 16 }))
      .pipe($.gp.csso({ restructure: true }))
      .pipe($.gp.sourcemaps.write('./'))
      .pipe($.gulp.dest($.config.root + '/assets/css'))
      .pipe($.browserSync.stream());
  })
};
