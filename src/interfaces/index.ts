// --------------------------------------------------
// IMPORT MODULES
// --------------------------------------------------
import { InstagramModule } from '../modules/instagram';
import { CacheModule } from '../modules/cache';
import { SlackModule } from '../modules/slack';

export interface SocialProxyInterface {
	instagram: InstagramModule,
	cache: CacheModule,
	slack: SlackModule,
};


export interface ModuleInterface {
	ref: any,
};
