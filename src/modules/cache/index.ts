import { ModuleInterface } from '../../interfaces';

export class CacheModule implements ModuleInterface {
	public ref: any;

	constructor( options: any = {} ) {
		if ( options.ref ) {
			this.ref = options.ref;
		}
	}

	// INSTANCE METHODS
	getCachePrefix() {
		return 'socialProxy';
	}

	setCache( data: any, options: any ) {
		if ( !window.localStorage ) {
			/// TODO[@jrmykolyn]: Print warning message.
			return;
		}

		const platform = options.platform;
		const handle = options.handle;
		const url = options.url;

		var key = `${this.getCachePrefix()}__${platform}__${handle}__${url}`;

		window.localStorage.setItem( key, data );
	}
}
