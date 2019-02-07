'use strict';

module.exports = function() {
    $.gulp.task('copy:php', function() {
        return $.gulp.src('./src/php/**/*.*', { since: $.gulp.lastRun('copy:php') })
            .pipe($.gulp.dest($.config.root));
    });
};
