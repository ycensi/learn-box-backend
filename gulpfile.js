var path = require("path");
var gulp = require("gulp");
//var runSequence = require('run-sequence');
var clean = require("gulp-rimraf");
var babel = require("gulp-babel");
var debug = require("gulp-debug");
var pm2 = require("pm2");

require("@babel/register");

const paths = {
  src: ["src/**/*.js"],
  test: ["src/**/test*.js"],
  build: "build"
};

function buildCode() {
  return gulp
    .src(paths.src)
    .pipe(babel())
    .on("error", handleError)
    .pipe(gulp.dest(paths.build));
}

function copyAssets() {
  return gulp
    .src([
      "./package.json",
      "./src/**/*.html",
      "./src/**/*.json",
      "./src/**/*.sql"
    ])
    .pipe(debug())
    .pipe(gulp.dest("build/"));
}

function restartPm2() {
  pm2.connect(true, function() {
    pm2.restart("all", function() {
      console.log("pm2 restart");
    });
  });
}

function handleError(error) {
  console.log(error.toString());
  this.emit("end");
}

gulp.task("build:production", () =>
  gulp.series("clean", "build:code", "cp:assets", function(done) {
    done();
  })
);

gulp.task("clean", function() {
  return gulp
    .src(["build/*", "coverage"], {
      read: false
    })
    .pipe(clean());
});

gulp.task("build:restart", gulp.series(buildCode, restartPm2));

gulp.task("watch", function() {
  gulp.watch(paths.src, gulp.series(buildCode, restartPm2));
});

gulp.task("run", function() {
  pm2.connect(true, function() {
    var pm2Config = require("./pm2.json");
    pm2.start(pm2Config, function() {
      console.log("pm2 started");
      pm2.streamLogs("all", 0);
    });
  });
});

gulp.task("build", gulp.series(buildCode, copyAssets));
gulp.task("default", gulp.series("build", "watch", "run"));
