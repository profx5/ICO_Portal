//MAIN
const gulp   = require('gulp'), //Gulp
browserSync  = require('browser-sync').create(), // Local server
//HTML
pug          = require('gulp-pug'), // Pug(Jade) into HTML
//CSS
postcss      = require('gulp-postcss'), // Sass sytnax in css
sourcemaps   = require('gulp-sourcemaps'), //Deep analysis for file direction
// cssnext          = require('postcss-cssnext'), // CSS4 syntax
autoprefixer = require('autoprefixer'), // Autoprefixer for older browsers
stylus       = require('gulp-stylus'),
cssgrace     = require('cssgrace'), // Insert IE hacks for css
mediaPacker  = require('css-mqpacker'), // Gather all media queries together
cssshort     = require('postcss-short'), // Shortcuts for css properties
imageset     = require('postcss-image-set-polyfill'), // Short-cuts for css
cssnano      = require('gulp-cssnano'), // CSS minification
//JAVASCRIPT
babel        = require('gulp-babel'), // Convert ES6 syntax into ES5
uglify       = require('gulp-uglify') // JavaScript minification
//OTHER
include      = require('gulp-include') // Include other files into another
concat       = require('gulp-concat'), // Get different files joined
cache        = require('gulp-cached'), // Cache edited files
imagemin     = require('gulp-imagemin'), // Minify images
pngquant     = require('imagemin-pngquant'), // Imagemin plugin for png
svgSprite    = require("gulp-svg-sprites"), // Get sprite from pack of images
rename       = require('gulp-rename'), // Rename files
del          = require('del'), // Remove files
notify       = require('gulp-notify'), // Tell about error during task processing
absolutePath = require('path'), // Create file's path
plumber      = require('gulp-plumber');


//MAIN
gulp.task('browser-sync', function() {
  browserSync.init({
    server: 'frontend/landing/dist',
    ghostMode: false,
    open: false
  });

});

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});
//MAIN


//HTML
gulp.task('html', function() {
      return gulp.src(['frontend/landing/src/html/template/template.html'])
        .pipe(include()).on('error', console.error)
        .pipe(rename('index.html'))
        .on('error', function(err) {
            notify({ title: 'template task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("frontend/landing/dist/"));
});
//HTML


//CSS
var processors = [
  cssshort,
  imageset,
  autoprefixer({
    browsers: "last 15 versions, > 1%, ie 8, ie 7"
  })
]

gulp.task('styles', function() {
  return gulp.src('frontend/landing/src/styles/*.styl')
  .pipe(sourcemaps.init())
    .pipe(plumber())
  .pipe(stylus())
  .pipe(postcss(processors))
    .pipe(cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true },
        discardUnused: {fontFace: false}
    }))
    .on('error', function(err) {
        notify({ title: 'CSS task error!' }).write(err.message);
        this.emit('end');
    })
    .pipe(gulp.dest('frontend/landing/dist/static/styles'))
})
//CSS


//JAVASCRIPT
gulp.task('scripts:single', function() {
    return gulp.src('frontend/landing/src/js/pages/*.js')
        .pipe(plumber())
        .pipe(include()).on('error', console.error)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .on('error', function(err) {
            notify({ title: 'scripts:single task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("frontend/landing/dist/static/js"));
});

gulp.task('scripts:all', function() {
    return gulp.src('frontend/landing/src/js/**/*.js')
        .pipe(include()).on('error', console.error)
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .on('error', function(err) {
            notify({ title: 'scripts:all task error!' }).write(err.message);
            this.emit('end');
        })
        .pipe(gulp.dest("frontend/landing/dist/static/js"));
});

gulp.task('vendor:js', function() {
    return gulp.src(['frontend/landing/src/vendor/jquery/**/*', 'frontend/landing/src/vendor/**/!(jquery)*.js'])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('frontend/landing/dist/static/js'))
})

gulp.task('vendor:css', function() {
    return gulp.src('frontend/landing/src/vendor/**/*.css')
    .pipe(concat('vendor.css'))
    .pipe(cssnano({
        zindex: false,
        autoprefixer: false,
        discardComments: { removeAll: true }
    }))
    .pipe(gulp.dest('frontend/landing/dist/static/styles'))
})
//JAVASCRIPT


gulp.task('images', function() {
    return gulp.src('frontend/landing/src/assets/img/*', {since: gulp.lastRun('images')})
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('frontend/landing/dist/static'))
})


gulp.task('assets', function() {
    return gulp.src(['frontend/landing/src/assets/**', '!frontend/landing/src/assets/img/*'], {since: gulp.lastRun('assets')})
        .pipe(gulp.dest('frontend/landing/dist/static'))
})

// gulp.task('svgSprite', function () {
//     return gulp.src('frontend/landing/src/img/sprite')
//         .pipe(svgSprite())
//         .pipe(gulp.dest("frontend/landing/dist/img/sprite/done"));
// });


gulp.task('clean:dist', function() {
  return del('frontend/landing/dist');
});

gulp.task('clean:public', function() {
    return del('frontend/landing/public');
});


gulp.task('clear', function (callback) {
  return cache.clearAll();
});


//DEV //DEV //DEV
gulp.task('watch', gulp.series('clean:dist', gulp.parallel('html', 'styles', 'scripts:all', 'vendor:css', 'vendor:js', 'assets'), function() {
    gulp.watch(['frontend/landing/src/html/**/*.html'], gulp.series('html', 'reload'));
    gulp.watch('frontend/landing/src/styles/**/*.*', gulp.series('styles', 'reload'));
    gulp.watch(['frontend/landing/src/js/**/*.*'], gulp.series('scripts:all', 'reload'));
    // gulp.watch(['frontend/landing/src/js/widgets/**/*.*', 'frontend/landing/src/js/chunks/**/*.*'], gulp.series('scripts:all', 'reload'));
    gulp.watch(['frontend/landing/src/assets/**/*.*'], gulp.series('assets', 'reload'));
    gulp.watch('frontend/landing/src/assets/img/**/*.*', gulp.series('images', 'reload'));
    gulp.watch('frontend/landing/src/vendor/**/*.css', gulp.series('vendor:css', 'reload'));
    gulp.watch('frontend/landing/src/vendor/**/*.js', gulp.series('vendor:js', 'reload'));
}));

gulp.task('dev', gulp.parallel('watch', 'browser-sync'));
//DEV //DEV //DEV


// BUILD  // BUILD  // BUILD  // BUILD


// gulp.task('reduce:js', function() {
//     return gulp.src('frontend/landing/dist/js/**/*')
//             .pipe(uglify())
//             .pipe(gulp.dest('frontend/landing/public/js'))
// })

// gulp.task('reduce:css', function() {
//     return gulp.src('frontend/landing/dist/styles/**/*')
//             .pipe(cssnano({
//                 zindex: false,
//                 autoprefixer: false,
//                 discardComments: { removeAll: true }
//             }))
//             .pipe(gulp.dest('frontend/landing/public/styles'))
// })

// gulp.task('build', gulp.series('clean:public', gulp.parallel('reduce:css', 'reduce:js'), function() {
//     return gulp.src([
//         'frontend/landing/dist/!(styles|js)/**/*',
//         'frontend/landing/dist/*'
//         ])
//             .pipe(gulp.dest('public'))
// }))

// BUILD  // BUILD  // BUILD  // BUILD
