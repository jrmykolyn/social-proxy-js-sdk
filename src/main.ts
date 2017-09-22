// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
import { InstagramModule } from './modules/instagram';

( function( window: any ) {
	if ( window[ 'socialProxy' ] ) {
		console.log( 'Whoops, looks like the `socialProxy` API has already been added!' );
		return;
	}

	interface SocialProxyInterface {
		instagram: InstagramModule
	}

	class SocialProxy implements SocialProxyInterface {
		public instagram: InstagramModule;

		constructor() {
			this.instagram = new InstagramModule();
		}
	};

	window[ 'socialProxy' ] = new SocialProxy();
} )( window );
