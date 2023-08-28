var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var fs = require('fs');

// Task to compile TypeScript to JavaScript
gulp.task('compile', function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest('dist'));
});

// Task to clean dist folder
gulp.task('clean', function() {
    if (fs.existsSync('./dist')) {
        // Remove dist folder and signal completion
        fs.rm('./dist', { recursive: true, force: true }, (err) => {
            if (err) {
                throw err;
            }
        });
        return Promise.resolve();
    } else {
        // Signal completion
        return Promise.resolve();
    }
});

// Task to create a copy of the current views ejs files in dist
gulp.task('copy-views', function() {
    return gulp.src('./src/views/**/*.ejs')
        .pipe(gulp.dest('./dist/views'));
});

// Task to create a copy of the assets folder in dist
gulp.task('copy-assets', function() {
    return gulp.src('./src/public/assets/**/*')
        .pipe(gulp.dest('./dist/public/assets'));
});

// Default task which will run all the tasks in order
gulp.task('default', gulp.series('clean', 'compile', 'copy-views', 'copy-assets'), () => {
    console.log('All tasks completed!');
});
