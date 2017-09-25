import { ModuleInterface } from '../../interfaces';

export class InstagramModule implements ModuleInterface {
	public ref: any;

	constructor( options: any = {} ) {
		if ( options.ref ) {
			this.ref = options.ref;
		}
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
			var _this = this;
			var query = options.query || {};
			var queryString = Object.keys( query ).map( ( key ) => { return `${key}=${query[ key ]}`; } ).join( '&' );

			/// TODO[@jrmykolyn]:
			// - Hash request URL.
			// - Check cache for matching data.
			// - Check 'freshness'.
			// - Resolve Promise with cached data if appropriate.

			var req = new XMLHttpRequest();

			var url = `https://social-proxy.herokuapp.com/instagram/${handle}?${queryString}`;

			req.open( 'GET', url );

			req.onreadystatechange = function() {
				if ( this.readyState === 4 ) {
					var status: any = this.status;

					if ( parseInt( status ) === 200 ) {

						/// TODO[@jrmykolyn]:
						// - Check options for `cache` vars.
						// - Cache data if appropriate.
						// - Set 'freshness' value.

						if ( !!options.cache ) {
							_this.ref.cache.setCache( this.response, { platform: 'instagram', handle: handle, url: url } );
						}

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
