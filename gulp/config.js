/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   16-02-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 16-02-2017
 */

var gulp = require('gulp');
var fs = require('fs');
var argv = require('yargs').argv;
var ngConstant = require('gulp-ng-constant');
var rename = require('gulp-rename');
var paths = gulp.paths;

var environment = argv.env || 'devel';
var ENV = JSON.parse(fs.readFileSync('angular-env-vars/config-' + environment + '.json', 'utf8')).ENV;

gulp.task('config', function() {
  gulp.src('angular-env-vars/config-' + environment + '.json')
    .pipe(ngConstant({
      name: 'config',
      dest: 'config.js'
    }))
    .pipe(rename('config.js'))
    .pipe(gulp.dest(paths.src + '/app'));
});
