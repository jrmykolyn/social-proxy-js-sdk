// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const gulp = require( 'gulp' );
const concat = require( 'gulp-concat' ); /// TODO[@jrmykolyn]: Remove assignment. Remove from `package.json`.
const ts = require( 'gulp-typescript' );

// --------------------------------------------------
// DECLARE VARS
// --------------------------------------------------
var tsProject = ts.createProject( './tsconfig.json' );

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
	var tsResult = gulp.src( './src/**/*.ts' )
		.pipe( tsProject() );

		return tsResult.js.pipe( gulp.dest( './dist' ) );
} );
