( function( window: any ) {
	if ( window[ 'socialProxy' ] ) {
		console.log( 'Whoops, looks like the `socialProxy` API has already been added!' );
		return;
	}

	class SocialProxy {
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
		instagram( handle: string, options: any = {} ): void {
			return new Promise( ( resolve, reject ) => {
				var query = options.query || {};
				var queryString = Object.keys( query ).map( ( key ) => { return `${key}=${query[ key ]}`; } ).join( '&' );

				var req = new XMLHttpRequest();

				req.open( 'GET', `https://social-proxy.herokuapp.com/instagram/${handle}?${queryString}` );

				req.onreadystatechange = function() {
					if ( this.readyState === 4 ) {
						if ( parseInt( this.status, 10 ) === 200 ) {
							resolve( this.response );
						} else {
							reject( this.response || this.statusText );
						}
					}
				}

				req.send();
			} );
		}
	};

	window[ 'socialProxy' ] = new SocialProxy();
} )( window );
