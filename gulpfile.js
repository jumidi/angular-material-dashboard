/**
 * @Author: Juan Miguel Diago <juanmi>
 * @Date:   31-01-2017
 * @Email:  jumidi@gmail.com
* @Last modified by:   juanmi
* @Last modified time: 16-02-2017
 */



'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'src',
  dist: '../ubdashboard/client',
  tmp: '.tmp',
  e2e: 'e2e'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
