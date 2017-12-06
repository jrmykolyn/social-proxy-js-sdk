// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
// Node
const fs = require( 'fs' );

// Vendor
const gulp = require( 'gulp' );
const browserify = require( 'browserify' );
const tsify = require( 'tsify' );
const source = require( 'vinyl-source-stream' );
const ts = require( 'gulp-typescript' );
const typedoc= require( 'gulp-typedoc' );

// Project

const tsConfig = JSON.parse( fs.readFileSync( './tsconfig.json', 'utf8' ) );

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
gulp.task( 'default', [ 'build', 'demo', 'watch' ] );

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
		.pipe( source( `social-proxy.js` ) )
		.on( 'error', function( err ) { console.log( err.toString() ); } )
		.pipe( gulp.dest( './dist' ) );
} );

/**
 * Function prepares/compiles to the demo file(s).
 */
gulp.task( 'demo', function() {
	/// TODO
} );

/**
 * Function compiles Social Proxy module documentation into a static site.
 */
gulp.task( 'docs', function() {
	const options = Object.assign( tsConfig.compilerOptions, { out: './docs' } );

	return gulp.src( './src' )
		.pipe( typedoc( options ) );
} );

/**
 * Function watches for changes to `src/` files, runs appropriate tasks.
 */
gulp.task( 'watch', function() {
	gulp.watch( './src/**/*.ts', [ 'build' ] );
} );
