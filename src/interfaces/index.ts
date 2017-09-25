// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
import { InstagramModule } from '../modules/instagram';
import { CacheModule } from '../modules/cache';

export interface SocialProxyInterface {
	instagram: InstagramModule,
	cache: CacheModule,
};


export interface ModuleInterface {
	ref: any,
};
