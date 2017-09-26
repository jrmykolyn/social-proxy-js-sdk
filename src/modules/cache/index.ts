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
	sanitizeTtl( ttl: number ) {
		return ( ttl && typeof ttl === 'number' ) ? ( new Date().getTime() + ttl ) : null;

	}

	/**
	 * ...
	 *
	 * @return {number}
	 */
	getDefaultTtl() {
		return ( new Date().getTime() + ( 1000 * 60 * 60 * 24 * 7 ) );
	}

	/**
	 * ...
	 *
	 * @return {string}
	 */
	getCachePrefix() {
		return 'socialProxy';
	}

	/**
	 * ...
	 *
	 * @param {Object} data
	 * @param {Object} options
	 */
	setCache( data: any, options: any ) {
		if ( !window.localStorage ) {
			/// TODO[@jrmykolyn]: Print warning message.
			return;
		}

		const platform = options.platform;
		const handle = options.handle;
		const url = options.url;
		const ttl = this.sanitizeTtl( options.ttl ) || this.getDefaultTtl();

		// Update data with `socialProxy` client info.
		data.socialProxy = {
			ttl: ttl,
		};

		var key = `${this.getCachePrefix()}__${platform}__${handle}__${url}`;

		window.localStorage.setItem( key, JSON.stringify( data ) );
	}
}
