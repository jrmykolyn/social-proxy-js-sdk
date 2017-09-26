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
			var ttl = options.ttl || null;
			var queryString = Object.keys( query ).map( ( key ) => { return `${key}=${query[ key ]}`; } ).join( '&' );

			// Construct request endpoint.
			var url = `https://social-proxy.herokuapp.com/instagram/${handle}?${queryString}`;

			// Check if requested data has been fetched/cached.
			var cachedData = _this.ref.cache.getCache( { platform: 'instagram', handle, url } );

			var req = null;

			// Return cached data if:
			// - 'bust cache' set to false.
			// - data exists.
			// - data is not expired.
			// Otherwise, fetch new data.
			if ( !options.bustCache && cachedData && !cachedData.socialProxy.isExpired ) {
				resolve( cachedData );
				return;
			} else {
				req = new XMLHttpRequest();

				req.open( 'GET', url );

				req.onreadystatechange = function() {
					if ( this.readyState === 4 ) {
						var status: any = this.status;

						if ( parseInt( status ) === 200 ) {

							if ( !!options.cache ) {
								_this.ref.cache.setCache( JSON.parse( this.response ), {
									platform: 'instagram',
									handle,
									url,
									ttl,
								} );
							}

							resolve( JSON.parse( this.response ) );
						} else {
							reject( this.response || this.statusText );
						}
					}
				}

				req.send();
			}
		} );
	}
}
