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
	 * ...
	 *
	 * @param {number} ttl
	 * @return {number|null}
	 */
	sanitizeTtl( ttl: number ): any {
		return ( ttl && typeof ttl === 'number' ) ? ( new Date().getTime() + ttl ) : null;

	}

	/**
	 * ...
	 *
	 * @return {number}
	 */
	getDefaultTtl(): number {
		return ( new Date().getTime() + ( 1000 * 60 * 60 * 24 * 7 ) );
	}

	/**
	 * ...
	 *
	 * @return {string}
	 */
	getCachePrefix(): string {
		return 'socialProxy';
	}

	/**
	 * ...
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
	 * ...
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
	 * ...
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
