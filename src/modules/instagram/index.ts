import { endpoints } from '../../config';
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
	 * Function fetches a given Instagram feed from the Social Proxy API, returns the result as a Promise.
	 *
	 * @param {string} handle - The Instagram handle/feed to fetch.
	 * @param {Object} options
	 * @return {Promise}
	 */
	fetch( handle: string, options: any = {} ) {
		return new Promise( ( resolve, reject ) => {
			var query = options.query || {};
			var ttl = options.ttl || null;
			var queryString = Object.keys( query ).map( ( key ) => { return `${key}=${query[ key ]}`; } ).join( '&' );

			// Construct request endpoint.
			var url = `${endpoints.instagram}/${handle}?${queryString}`;

			// Check if requested data has been fetched/cached.
			var cachedData = this.ref.cache.getCache( { platform: 'instagram', handle, url } );

			// Return cached data if:
			// - 'bust cache' set to false.
			// - data exists.
			// - data is not expired.
			// Otherwise, fetch new data.
			if ( !options.bustCache && cachedData && !cachedData.socialProxy.isExpired ) {
				resolve( cachedData );
				return;
			// Otherwise, fetch new data.
			} else {
				fetch( url )
					.then( ( response ) => {
						return response.json();
					} )
					.then( ( data ) => {
						// Reject if error.
						if ( data.error ) {
							reject( data );
							return;
						}

						// Cache if applicable.
						if ( !!options.cache ) {
							this.ref.cache.setCache( data, {
								platform: 'instagram',
								handle,
								url,
								ttl,
							} );
						}

						resolve( data );
					} )
					.catch( ( err ) => {
						reject( err ); /// TODO: Ensure that this includes meaningful info/has same 'shape' as other errors.
					}  );
			}
		} );
	}
}
