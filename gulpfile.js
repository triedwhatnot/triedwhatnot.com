const gulp = require('gulp');
const path = require('path');
// css
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
// js
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
// ejs
const htmlmin = require('gulp-htmlmin');
const brotli = require('gulp-brotli');
const gzip = require('gulp-gzip');

// CSS task
gulp.task('minify-css', function() {
  return gulp.src(['./public/stylesheets/**/*.css', '!./public/stylesheets/**/*.min.css']) // Source CSS files and files to exlude
        .pipe(postcss([
            autoprefixer(), // Automatically add vendor prefixes
            cssnano({
            preset: ['default', {
                discardComments: { removeAll: true }, // Remove all comments
                reduceIdents: false, // Disable identifier reduction
                zindex: false, // Disable z-index rebasing
                normalizeWhitespace: true, // Minify whitespace
                mergeLonghand: true // Merge longhand properties
            }]
            })
        ]))
        .pipe(rename({ suffix: '.min' })) // Add .min to the filename
        .pipe(gulp.dest('public/stylesheets')); // Destination folder for minified CSS
});

// JavaScript task
gulp.task('minify-js', function() {
  return gulp.src(['./public/javascripts/**/*.js', '!./public/javascripts/**/*.min.js']) // Source folder for JavaScript files
        .pipe(babel({
            presets: ['@babel/preset-env'] // Transpile ES6+ code to ES5
        }))
        .pipe(uglify({
            compress: {
                drop_console: true,
                drop_debugger: true,
                passes: 3
            },
            output: {
                comments: false,
                beautify: false
            },
            toplevel: true,
        })) // Minify the JS
        .pipe(rename({ suffix: '.min' })) // Add .min to the filename
        .pipe(gulp.dest('public/javascripts')); // Destination folder for minified JS
});

// minify EJS 
gulp.task('minify-ejs', function() {
    return gulp.src(['./views/**/*.ejs', '!./views/**/*-min.ejs']) // Source folder for EJS files
      .pipe(htmlmin({
        collapseWhitespace: true, // Remove extra white spaces
        removeComments: true, // Remove comments
        minifyJS: true, // Minify inline JavaScript
        minifyCSS: true // Minify inline CSS
      }))
      .pipe(rename({ suffix: '-min' })) // Add .min to the filename
      .pipe(gulp.dest('views')); // Destination folder for minified EJS files
  });


// Brotli compression task
gulp.task('compress-br', () => {
    return gulp.src(['./public/stylesheets/**/*.min.css', './public/javascripts/**/*.min.js', './views/**/*-min.ejs'])
        .pipe(brotli.compress({
            extension: 'br',
            quality: 11
        }))
        .pipe(gulp.dest(function(file) {
            // Define the base directories
            const baseDirs = [
                'public/stylesheets',
                'public/javascripts',
                'views'
            ];
            // Determine the output path for the compressed file
            const dest = baseDirs.find(baseDir => file.path.includes(baseDir));
            return dest;
        }));
});
  
// Gzip compression task
gulp.task('compress-gz', () => {
    return gulp.src(['./public/stylesheets/**/*.min.css', './public/javascripts/**/*.min.js', './views/**/*-min.ejs'])
        .pipe(gzip({
            append: true,
            gzipOptions: {
                level: 9
            }
        }))
        .pipe(gulp.dest(function(file) {
            // Define the base directories
            const baseDirs = [
                'public/stylesheets',
                'public/javascripts',
                'views'
            ];
            // Determine the output path for the compressed file
            const dest = baseDirs.find(baseDir => file.path.includes(baseDir));
            return dest;
        }));
});

// Default task
gulp.task('minify', gulp.parallel('minify-css', 'minify-js', 'minify-ejs'));

gulp.task('compress', gulp.parallel('compress-br', 'compress-gz'));

gulp.task('default', gulp.series('minify', 'compress'));