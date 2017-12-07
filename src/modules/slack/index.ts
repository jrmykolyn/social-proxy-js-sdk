import { endpoints } from '../../config';
import { ModuleInterface } from '../../interfaces';

export class SlackModule implements ModuleInterface {
	public ref: any;

	constructor( options: any = {} ) {
		if ( options.ref ) {
			this.ref = options.ref;
		}
	}

	// INSTANCE METHODS
	/**
	 * Given a `handle` string, method sends a POST request to the corresponding Social Proxy endpoint and returns the result as a Promise.
	 *
	 * The method must be invoked with an `options` object, which in turn must include a 'text' key.
	 *
	 * @param {string} handle
	 * @return {Promise}
	 */
	/// TODO: Update method to accept any data which can be posted to Slack (eg. 'attachments', 'pretext', etc.).
	post( handle: string, options: any = {} ): Promise<any> {
		return new Promise( ( resolve, reject ) => {
			let { text } = options;

			if ( !handle || typeof handle !== 'string' ) {
				reject( 'Missing `handle`' );
				return;
			}

			if ( !text || typeof text !== 'string' ) {
				reject( '`options` object must include a `text` key of type string.' );
				return;
			}

			let url = `${endpoints.slack}/${handle}?text=${text}`;
			let requestConfig = {
				method: 'POST',
			};

			fetch( url, requestConfig )
				.then( ( response ) => {
					resolve( response.text() ); /// TODO: Confirm that response will be 'text' in all cases.
				} )
				.catch( ( err ) => {
					reject( err );
				} );
		} );
	}
}
