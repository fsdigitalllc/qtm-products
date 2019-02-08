'use strict';

global.$ = {
    package: require('./package.json'),
    config: require('./gulp/config'),
    path: {
        task: require('./gulp/paths/tasks.js'),
        jsVendor: require('./gulp/paths/js.vendor.js'),
        cssVendor: require('./gulp/paths/css.vendor.js'),
        app: require('./gulp/paths/app.js')
    },
    gulp: require('gulp'),
    // cssunit: require('gulp-css-unit'),
    del: require('del'),
    fs: require('fs'),
    spritesmith: require('gulp.spritesmith'),
    browserSync: require('browser-sync').create(),
    gp: require('gulp-load-plugins')()
};

$.path.task.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    'clean',
    $.gulp.parallel(
        'sass',
        'html',
        'js:process',
        'copy:image',
        'copy:font',
        'copy:javascript',
        'css:vendor',
        'sprite:svg',
        'sprite:png',
        'sprite:gif',
        'js:vendor'
    ),
    $.gulp.parallel(
        'watch',
        'serve'
    )
));
