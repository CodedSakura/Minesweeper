let gulp                = require('gulp'                );
let gutil               = require("gulp-util"           );
let webpack             = require("webpack"             );
let sourcemaps          = require("gulp-sourcemaps"     );
let autoprefixer        = require("gulp-autoprefixer"   );
let cleanCSS            = require("gulp-clean-css"      );
let broSync             = require('browser-sync'        ).create();

gulp.task('reload', function() {
    broSync.reload();
})
gulp.task("webpack", function(callback) {
    // run webpack
    webpack({
        entry: './src/js/app.js',
        output: {
            filename: './public/js/app.js',
        },
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        gulp.start('reload');
    });
});

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/css'))
    .pipe(broSync.stream({match: '**/*.css'}));
})

gulp.task('default', function() {
    gulp.start('css');
    gulp.start('webpack');
});

gulp.task('watch', function() {

    gulp.start(['css', 'webpack']);
    gulp.watch('./src/css/**/*.css',  ['css']    );
    gulp.watch('./src/css/*.css',     ['css']    );
    gulp.watch('./src/js/**/*.js',      ['webpack'] );
    gulp.watch('./src/js/*.js',         ['webpack'] );

    broSync.init({
        server: {
            baseDir: 'public/',
        },
        port: 3000               // cloud9 proxied port to 80
    });
});
