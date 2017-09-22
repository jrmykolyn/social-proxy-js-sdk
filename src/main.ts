( function( window: any ) {
	if ( window[ 'socialProxy' ] ) {
		console.log( 'Whoops, looks like the `socialProxy` API has already been added!' );
		return;
	}

	class InstagramModule {
		constructor() {

		}

		// INSTANCE METHODS
		/**
		 * Function fetches a given Instagram feed from the Social Proxy API, returns the result as a Promise
		 *
		 * @param {string} handle - The Instagram handle/feed to fetch.
		 * @param {Object} options
		 * @return {Promise}
		 */
		fetch( handle: string, options: any = {} ) {
			return new Promise( ( resolve, reject ) => {
				var query = options.query || {};
				var queryString = Object.keys( query ).map( ( key ) => { return `${key}=${query[ key ]}`; } ).join( '&' );

				var req = new XMLHttpRequest();

				req.open( 'GET', `https://social-proxy.herokuapp.com/instagram/${handle}?${queryString}` );

				req.onreadystatechange = function() {
					if ( this.readyState === 4 ) {
						var status: any = this.status;

						if ( parseInt( status ) === 200 ) {
							resolve( this.response );
						} else {
							reject( this.response || this.statusText );
						}
					}
				}

				req.send();
			} );
		}
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
