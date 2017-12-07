// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
import { InstagramModule } from './modules/instagram';
import { CacheModule } from './modules/cache';
import { SlackModule } from './modules/slack';
import { SocialProxyInterface } from './interfaces';

( function( window: any ) {
	if ( window[ 'socialProxy' ] ) {
		console.log( 'Whoops, looks like the `socialProxy` API has already been added!' );
		return;
	}

	class SocialProxy implements SocialProxyInterface {
		public instagram: InstagramModule;
		public cache: CacheModule;
		public slack: SlackModule;

		constructor() {
			this.instagram = new InstagramModule( { ref: this } );
			this.cache = new CacheModule( { ref: this } );
			this.slack = new SlackModule( { ref: this } );
		}
	};

	window[ 'socialProxy' ] = new SocialProxy();
} )( window );
