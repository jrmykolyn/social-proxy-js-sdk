import { ModuleInterface } from '../../interfaces';

export class CacheModule implements ModuleInterface {
	public ref: any;

	constructor( options: any = {} ) {
		if ( options.ref ) {
			this.ref = options.ref;
		}
	}

	// INSTANCE METHODS
	/**
	 * Ensures that the `ttl` is a number; adds to current timestamp (in MS) to value provided.
	 *
	 * If `ttl` is missing/invalid, function returns `null`.
	 *
	 * @param {number} ttl
	 * @return {number|null}
	 */
	sanitizeTtl( ttl: number ): any {
		return ( ttl && typeof ttl === 'number' ) ? ( new Date().getTime() + ttl ) : null;

	}

	/**
	 * Returns the default `ttl` value (ie. 1 week from current moment, as MS).
	 *
	 * @return {number}
	 */
	getDefaultTtl(): number {
		return ( new Date().getTime() + ( 1000 * 60 * 60 * 24 * 7 ) );
	}

	/**
	 * Returns the Social Proxy cache prefix/namespace string.
	 *
	 * @return {string}
	 */
	getCachePrefix(): string {
		return 'socialProxy';
	}

	/**
	 * Given an `options` object, function returns a valid Social Proxy cache key or falls back to `null`.
	 *
	 * @param {Object} options
	 */
	getCacheKey( options: any = {} ): any {
		var platform = options.platform;
		var handle = options.handle;
		var url = options.url;

		if ( platform && handle && url ) {
			return `${this.getCachePrefix()}__${platform}__${handle}__${url}`;
		} else {
			return null;
		}
	}

	/**
	 * Given an `options` object, function assembles a cache key and attempts to fetch the corresponding data.
	 *
	 * If the required arguments are missing, or the data does not exist, function returns `null`.
	 *
	 * @param {Object} options
	 * @param {Mixed|null}
	 */
	getCache( options: any = {} ): any {
		var key = this.getCacheKey( options );
		var data = null;

		if ( !key ) {
			return null;
		}

		data = window.localStorage.getItem( key );

		return ( data ) ? JSON.parse( data ) : data;
	}

	/**
	 * Saves the `data` to the cache using the `options` provided.
	 *
	 * @param {Object} data
	 * @param {Object} options
	 */
	setCache( data: any, options: any ): any {
		if ( !window.localStorage ) {
			/// TODO[@jrmykolyn]: Print warning message.
			return;
		}

		const key = this.getCacheKey( options );
		const ttl = this.sanitizeTtl( options.ttl ) || this.getDefaultTtl();

		// Update data with `socialProxy` client info.
		data.socialProxy = {
			ttl: ttl,
		};

		window.localStorage.setItem( key, JSON.stringify( data ) );
	}
}
