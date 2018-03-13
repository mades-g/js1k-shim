var gulp = require('gulp');
var closureCompiler = require('google-closure-compiler').gulp();
var browserSync = require('browser-sync').create();

var regpack = require('./gulp-regpack');
var shim = require('./gulp-shim');

gulp.task('compress', function() {
  var canvas_shim = true;
  var webgl = false;
  var audio = false

  return gulp.src('src/microvaders.js')
    .pipe(closureCompiler({
      compilation_level: 'WHITESPACE_ONLY'
    }))
    .pipe(regpack({
  		withMath: false,
  		hash2DContext: !webgl,
  		hashWebGLContext: webgl,
  		hashAudioContext: audio,
  		contextVariableName: 'c',
  		contextType: webgl ? 1 : 0,
  		reassignVars: true,
  		varsNotReassigned: ['a', 'b', 'c'],
  		crushGainFactor: 1,
  		crushLengthFactor: 0,
  		crushCopiesFactor: 0,
  		crushTiebreakerFactor: 1,
  		wrapInSetInterval: false,
  		timeVariableName: ""
		}))
    .pipe(shim({
      canvas_shim: canvas_shim,
      webgl: webgl,
      max_width: 0,
      max_height: 0,
      max_100p: true,
      center_canvas: false,
      reload_onorientationchange: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js-watch', ['compress'], function(cb){
  browserSync.reload();
  cb();
});

gulp.task('serve', ['compress'], function() {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "shims/shim.html"
        }
    });
    gulp.watch("src/microvaders.js", ['js-watch']);
});

gulp.task('default', ['compress']);
