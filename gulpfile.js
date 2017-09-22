// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node

// Vendor
const gulp = require( 'gulp' );
const browserify = require( 'browserify' );
const tsify = require( 'tsify' );
const source = require( 'vinyl-source-stream' );
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
 * Function compiles source files (TypeScript) into distributable JavaScript files.
 */
gulp.task( 'build', function() {
	return browserify( {
		basedir: '.',
		debug: true,
		entries: [ 'src/main.ts' ],
		cache: {},
		packageCache: {}
	} )
		.plugin( tsify )
		.bundle()
		.pipe( source( 'bundle.js' ) )
		.on( 'error', function( err ) { console.log( err.toString() ); } )
		.pipe( gulp.dest( './dist' ) );
} );
