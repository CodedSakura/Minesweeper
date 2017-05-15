let gulp                = require('gulp'                );
let gutil               = require("gulp-util"           );
let webpack             = require("webpack-stream"      );
let sourcemaps          = require("gulp-sourcemaps"     );
let autoprefixer        = require("gulp-autoprefixer"   );
let sass                = require('gulp-sass'           );
let broSync             = require('browser-sync'        ).create();

gulp.task("webpack", function() {
    return gulp.src('./src/js/app.js')
        .pipe(webpack({devtool: 'source-map',output:{filename: 'app.js'}}))
        .pipe(gulp.dest('./public/js'))
        .pipe(broSync.stream({match: '**/*.js'}));
});

gulp.task('css', function() {
    return gulp.src('src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css'))
        .pipe(broSync.stream({match: '**/*.css'}));
})

gulp.task('default', function() {
    gulp.start('css');
    gulp.start('webpack');
});

gulp.task('watch', function() {

    gulp.start(['css', 'webpack']);
    gulp.watch(['./src/sass/**/*.scss', './src/sass/*.scss'],  ['css']     );
    gulp.watch(['./src/js/**/*.js', './src/js/*.js'],      ['webpack'] );
    broSync.init({
        server: {
            baseDir: 'public/',
        },
        port: 3000
    });
});