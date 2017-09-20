// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
var gulp = require( 'gulp' );
var concat = require( 'gulp-concat' );
var ts = require( 'gulp-typescript' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------

// --------------------------------------------------
// DEFINE TASKS
// --------------------------------------------------
/**
 * Wrapper around any/all tasks to be executed when `gulp` is run.
 */
gulp.task( 'default', [ 'build' ] );

/**
 * Function compiles all source files (TypeScript) into distributable JavaScript files.
 */
gulp.task( 'build', function() {
	gulp.src( './src/**/*.ts' )
		.pipe( ts() )
		.pipe( concat( 'main.js' ) )
		.pipe( gulp.dest( './dist' ) );
} );
