(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instagram_1 = require("./modules/instagram");
const cache_1 = require("./modules/cache");
(function (window) {
    if (window['socialProxy']) {
        console.log('Whoops, looks like the `socialProxy` API has already been added!');
        return;
    }
    class SocialProxy {
        constructor() {
            this.instagram = new instagram_1.InstagramModule({ ref: this });
            this.cache = new cache_1.CacheModule({ ref: this });
        }
    }
    ;
    window['socialProxy'] = new SocialProxy();
})(window);

},{"./modules/cache":2,"./modules/instagram":3}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CacheModule {
    constructor(options = {}) {
        if (options.ref) {
            this.ref = options.ref;
        }
    }
    sanitizeTtl(ttl) {
        return (ttl && typeof ttl === 'number') ? (new Date().getTime() + ttl) : null;
    }
    getDefaultTtl() {
        return (new Date().getTime() + (1000 * 60 * 60 * 24 * 7));
    }
    getCachePrefix() {
        return 'socialProxy';
    }
    getCacheKey(options = {}) {
        var platform = options.platform;
        var handle = options.handle;
        var url = options.url;
        if (platform && handle && url) {
            return `${this.getCachePrefix()}__${platform}__${handle}__${url}`;
        }
        else {
            return null;
        }
    }
    decorateCache(data = {}) {
        if (!data.socialProxy) {
            data.socialProxy = {};
        }
        if (data.socialProxy.ttl && typeof data.socialProxy.ttl === 'number') {
            data.socialProxy.isExpired = (data.socialProxy.ttl < new Date().getTime());
        }
        return data;
    }
    getCache(options = {}) {
        var key = this.getCacheKey(options);
        var data = null;
        if (!key) {
            return null;
        }
        data = window.localStorage.getItem(key);
        return (data) ? this.decorateCache(JSON.parse(data)) : data;
    }
    setCache(data, options) {
        if (!window.localStorage) {
            return;
        }
        const key = this.getCacheKey(options);
        const ttl = this.sanitizeTtl(options.ttl) || this.getDefaultTtl();
        data.socialProxy = {
            ttl: ttl,
        };
        window.localStorage.setItem(key, JSON.stringify(data));
    }
}
exports.CacheModule = CacheModule;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InstagramModule {
    constructor(options = {}) {
        if (options.ref) {
            this.ref = options.ref;
        }
    }
    fetch(handle, options = {}) {
        return new Promise((resolve, reject) => {
            var _this = this;
            var query = options.query || {};
            var ttl = options.ttl || null;
            var queryString = Object.keys(query).map((key) => { return `${key}=${query[key]}`; }).join('&');
            var url = `https://social-proxy.herokuapp.com/instagram/${handle}?${queryString}`;
            var cachedData = _this.ref.cache.getCache({ platform: 'instagram', handle, url });
            var req = null;
            if (!options.bustCache && cachedData && !cachedData.socialProxy.isExpired) {
                resolve(cachedData);
                return;
            }
            else {
                req = new XMLHttpRequest();
                req.open('GET', url);
                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        var status = this.status;
                        if (parseInt(status) === 200) {
                            if (!!options.cache) {
                                _this.ref.cache.setCache(JSON.parse(this.response), {
                                    platform: 'instagram',
                                    handle,
                                    url,
                                    ttl,
                                });
                            }
                            resolve(JSON.parse(this.response));
                        }
                        else {
                            reject(this.response || this.statusText);
                        }
                    }
                };
                req.send();
            }
        });
    }
}
exports.InstagramModule = InstagramModule;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi50cyIsInNyYy9tb2R1bGVzL2NhY2hlL2luZGV4LnRzIiwic3JjL21vZHVsZXMvaW5zdGFncmFtL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNHQSxtREFBc0Q7QUFDdEQsMkNBQThDO0FBRzlDLENBQUUsVUFBVSxNQUFXO0lBQ3RCLEVBQUUsQ0FBQyxDQUFFLE1BQU0sQ0FBRSxhQUFhLENBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBRSxrRUFBa0UsQ0FBRSxDQUFDO1FBQ2xGLE1BQU0sQ0FBQztJQUNSLENBQUM7SUFFRDtRQUlDO1lBQ0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLDJCQUFlLENBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUUsQ0FBQztZQUN0RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksbUJBQVcsQ0FBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBRSxDQUFDO1FBQy9DLENBQUM7S0FDRDtJQUFBLENBQUM7SUFFRixNQUFNLENBQUUsYUFBYSxDQUFFLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUM3QyxDQUFDLENBQUUsQ0FBRSxNQUFNLENBQUUsQ0FBQzs7Ozs7QUN0QmQ7SUFHQyxZQUFhLFVBQWUsRUFBRTtRQUM3QixFQUFFLENBQUMsQ0FBRSxPQUFPLENBQUMsR0FBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDeEIsQ0FBQztJQUNGLENBQUM7SUFXRCxXQUFXLENBQUUsR0FBVztRQUN2QixNQUFNLENBQUMsQ0FBRSxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFFLENBQUMsQ0FBQyxDQUFDLENBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFH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IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIElNUE9SVCBNT0RVTEVTXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuaW1wb3J0IHsgSW5zdGFncmFtTW9kdWxlIH0gZnJvbSAnLi9tb2R1bGVzL2luc3RhZ3JhbSc7XG5pbXBvcnQgeyBDYWNoZU1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9jYWNoZSc7XG5pbXBvcnQgeyBTb2NpYWxQcm94eUludGVyZmFjZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbiggZnVuY3Rpb24oIHdpbmRvdzogYW55ICkge1xuXHRpZiAoIHdpbmRvd1sgJ3NvY2lhbFByb3h5JyBdICkge1xuXHRcdGNvbnNvbGUubG9nKCAnV2hvb3BzLCBsb29rcyBsaWtlIHRoZSBgc29jaWFsUHJveHlgIEFQSSBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkIScgKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjbGFzcyBTb2NpYWxQcm94eSBpbXBsZW1lbnRzIFNvY2lhbFByb3h5SW50ZXJmYWNlIHtcblx0XHRwdWJsaWMgaW5zdGFncmFtOiBJbnN0YWdyYW1Nb2R1bGU7XG5cdFx0cHVibGljIGNhY2hlOiBDYWNoZU1vZHVsZTtcblxuXHRcdGNvbnN0cnVjdG9yKCkge1xuXHRcdFx0dGhpcy5pbnN0YWdyYW0gPSBuZXcgSW5zdGFncmFtTW9kdWxlKCB7IHJlZjogdGhpcyB9ICk7XG5cdFx0XHR0aGlzLmNhY2hlID0gbmV3IENhY2hlTW9kdWxlKCB7IHJlZjogdGhpcyB9ICk7XG5cdFx0fVxuXHR9O1xuXG5cdHdpbmRvd1sgJ3NvY2lhbFByb3h5JyBdID0gbmV3IFNvY2lhbFByb3h5KCk7XG59ICkoIHdpbmRvdyApO1xuIiwiaW1wb3J0IHsgTW9kdWxlSW50ZXJmYWNlIH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBjbGFzcyBDYWNoZU1vZHVsZSBpbXBsZW1lbnRzIE1vZHVsZUludGVyZmFjZSB7XG5cdHB1YmxpYyByZWY6IGFueTtcblxuXHRjb25zdHJ1Y3Rvciggb3B0aW9uczogYW55ID0ge30gKSB7XG5cdFx0aWYgKCBvcHRpb25zLnJlZiApIHtcblx0XHRcdHRoaXMucmVmID0gb3B0aW9ucy5yZWY7XG5cdFx0fVxuXHR9XG5cblx0Ly8gSU5TVEFOQ0UgTUVUSE9EU1xuXHQvKipcblx0ICogRW5zdXJlcyB0aGF0IHRoZSBgdHRsYCBpcyBhIG51bWJlcjsgYWRkcyB0byBjdXJyZW50IHRpbWVzdGFtcCAoaW4gTVMpIHRvIHZhbHVlIHByb3ZpZGVkLlxuXHQgKlxuXHQgKiBJZiBgdHRsYCBpcyBtaXNzaW5nL2ludmFsaWQsIGZ1bmN0aW9uIHJldHVybnMgYG51bGxgLlxuXHQgKlxuXHQgKiBAcGFyYW0ge251bWJlcn0gdHRsXG5cdCAqIEByZXR1cm4ge251bWJlcnxudWxsfVxuXHQgKi9cblx0c2FuaXRpemVUdGwoIHR0bDogbnVtYmVyICk6IGFueSB7XG5cdFx0cmV0dXJuICggdHRsICYmIHR5cGVvZiB0dGwgPT09ICdudW1iZXInICkgPyAoIG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgdHRsICkgOiBudWxsO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGRlZmF1bHQgYHR0bGAgdmFsdWUgKGllLiAxIHdlZWsgZnJvbSBjdXJyZW50IG1vbWVudCwgYXMgTVMpLlxuXHQgKlxuXHQgKiBAcmV0dXJuIHtudW1iZXJ9XG5cdCAqL1xuXHRnZXREZWZhdWx0VHRsKCk6IG51bWJlciB7XG5cdFx0cmV0dXJuICggbmV3IERhdGUoKS5nZXRUaW1lKCkgKyAoIDEwMDAgKiA2MCAqIDYwICogMjQgKiA3ICkgKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBTb2NpYWwgUHJveHkgY2FjaGUgcHJlZml4L25hbWVzcGFjZSBzdHJpbmcuXG5cdCAqXG5cdCAqIEByZXR1cm4ge3N0cmluZ31cblx0ICovXG5cdGdldENhY2hlUHJlZml4KCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuICdzb2NpYWxQcm94eSc7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYW4gYG9wdGlvbnNgIG9iamVjdCwgZnVuY3Rpb24gcmV0dXJucyBhIHZhbGlkIFNvY2lhbCBQcm94eSBjYWNoZSBrZXkgb3IgZmFsbHMgYmFjayB0byBgbnVsbGAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqL1xuXHRnZXRDYWNoZUtleSggb3B0aW9uczogYW55ID0ge30gKTogYW55IHtcblx0XHR2YXIgcGxhdGZvcm0gPSBvcHRpb25zLnBsYXRmb3JtO1xuXHRcdHZhciBoYW5kbGUgPSBvcHRpb25zLmhhbmRsZTtcblx0XHR2YXIgdXJsID0gb3B0aW9ucy51cmw7XG5cblx0XHRpZiAoIHBsYXRmb3JtICYmIGhhbmRsZSAmJiB1cmwgKSB7XG5cdFx0XHRyZXR1cm4gYCR7dGhpcy5nZXRDYWNoZVByZWZpeCgpfV9fJHtwbGF0Zm9ybX1fXyR7aGFuZGxlfV9fJHt1cmx9YDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIEdpdmVuIGEgY2FjaGUgZGF0YSBvYmplY3QsIGZ1bmN0aW9uIGFkZHMgYW4gYGlzRXhwaXJlZGAgZmxhZyB0byB0aGUgYHNvY2lhbFByb3h5YCBrZXkuXG5cdCAqXG5cdCAqIGBpc0V4cHJpcmVkYCBpcyB0cnVlIG9mIHRoZSBjYWNoZSdzIGB0dGxgIHRpbWVzdGFtcCBpcyBsZXNzIHRoYW4gdGhlIGN1cnJlbnQgbW9tZW50LiBPdGhlcndpc2UsIGBpc0V4cGlyZWRgIGlzIGZhbHNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH1cblx0ICogQHJldHVybiB7T2JqZWN0fVxuXHQgKi9cblx0ZGVjb3JhdGVDYWNoZSggZGF0YTogYW55ID0ge30gKTogYW55IHtcblx0XHRpZiAoICFkYXRhLnNvY2lhbFByb3h5ICkge1xuXHRcdFx0ZGF0YS5zb2NpYWxQcm94eSA9IHt9O1xuXHRcdH1cblxuXHRcdGlmICggZGF0YS5zb2NpYWxQcm94eS50dGwgJiYgdHlwZW9mIGRhdGEuc29jaWFsUHJveHkudHRsID09PSAnbnVtYmVyJyApIHtcblx0XHRcdGRhdGEuc29jaWFsUHJveHkuaXNFeHBpcmVkID0gKCBkYXRhLnNvY2lhbFByb3h5LnR0bCA8IG5ldyBEYXRlKCkuZ2V0VGltZSgpICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblxuXHQvKipcblx0ICogR2l2ZW4gYW4gYG9wdGlvbnNgIG9iamVjdCwgZnVuY3Rpb24gYXNzZW1ibGVzIGEgY2FjaGUga2V5IGFuZCBhdHRlbXB0cyB0byBmZXRjaCB0aGUgY29ycmVzcG9uZGluZyBkYXRhLlxuXHQgKlxuXHQgKiBJZiB0aGUgcmVxdWlyZWQgYXJndW1lbnRzIGFyZSBtaXNzaW5nLCBvciB0aGUgZGF0YSBkb2VzIG5vdCBleGlzdCwgZnVuY3Rpb24gcmV0dXJucyBgbnVsbGAuXG5cdCAqXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG5cdCAqIEBwYXJhbSB7TWl4ZWR8bnVsbH1cblx0ICovXG5cdGdldENhY2hlKCBvcHRpb25zOiBhbnkgPSB7fSApOiBhbnkge1xuXHRcdHZhciBrZXkgPSB0aGlzLmdldENhY2hlS2V5KCBvcHRpb25zICk7XG5cdFx0dmFyIGRhdGEgPSBudWxsO1xuXG5cdFx0aWYgKCAha2V5ICkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0ZGF0YSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgga2V5ICk7XG5cblx0XHRyZXR1cm4gKCBkYXRhICkgPyB0aGlzLmRlY29yYXRlQ2FjaGUoIEpTT04ucGFyc2UoIGRhdGEgKSApIDogZGF0YTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTYXZlcyB0aGUgYGRhdGFgIHRvIHRoZSBjYWNoZSB1c2luZyB0aGUgYG9wdGlvbnNgIHByb3ZpZGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge09iamVjdH0gZGF0YVxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKi9cblx0c2V0Q2FjaGUoIGRhdGE6IGFueSwgb3B0aW9uczogYW55ICk6IGFueSB7XG5cdFx0aWYgKCAhd2luZG93LmxvY2FsU3RvcmFnZSApIHtcblx0XHRcdC8vLyBUT0RPW0Bqcm15a29seW5dOiBQcmludCB3YXJuaW5nIG1lc3NhZ2UuXG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3Qga2V5ID0gdGhpcy5nZXRDYWNoZUtleSggb3B0aW9ucyApO1xuXHRcdGNvbnN0IHR0bCA9IHRoaXMuc2FuaXRpemVUdGwoIG9wdGlvbnMudHRsICkgfHwgdGhpcy5nZXREZWZhdWx0VHRsKCk7XG5cblx0XHQvLyBVcGRhdGUgZGF0YSB3aXRoIGBzb2NpYWxQcm94eWAgY2xpZW50IGluZm8uXG5cdFx0ZGF0YS5zb2NpYWxQcm94eSA9IHtcblx0XHRcdHR0bDogdHRsLFxuXHRcdH07XG5cblx0XHR3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oIGtleSwgSlNPTi5zdHJpbmdpZnkoIGRhdGEgKSApO1xuXHR9XG59XG4iLCJpbXBvcnQgeyBNb2R1bGVJbnRlcmZhY2UgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGNsYXNzIEluc3RhZ3JhbU1vZHVsZSBpbXBsZW1lbnRzIE1vZHVsZUludGVyZmFjZSB7XG5cdHB1YmxpYyByZWY6IGFueTtcblxuXHRjb25zdHJ1Y3Rvciggb3B0aW9uczogYW55ID0ge30gKSB7XG5cdFx0aWYgKCBvcHRpb25zLnJlZiApIHtcblx0XHRcdHRoaXMucmVmID0gb3B0aW9ucy5yZWY7XG5cdFx0fVxuXHR9XG5cblx0Ly8gSU5TVEFOQ0UgTUVUSE9EU1xuXHQvKipcblx0ICogRnVuY3Rpb24gZmV0Y2hlcyBhIGdpdmVuIEluc3RhZ3JhbSBmZWVkIGZyb20gdGhlIFNvY2lhbCBQcm94eSBBUEksIHJldHVybnMgdGhlIHJlc3VsdCBhcyBhIFByb21pc2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBoYW5kbGUgLSBUaGUgSW5zdGFncmFtIGhhbmRsZS9mZWVkIHRvIGZldGNoLlxuXHQgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuXHQgKiBAcmV0dXJuIHtQcm9taXNlfVxuXHQgKi9cblx0ZmV0Y2goIGhhbmRsZTogc3RyaW5nLCBvcHRpb25zOiBhbnkgPSB7fSApIHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuXHRcdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdFx0dmFyIHF1ZXJ5ID0gb3B0aW9ucy5xdWVyeSB8fCB7fTtcblx0XHRcdHZhciB0dGwgPSBvcHRpb25zLnR0bCB8fCBudWxsO1xuXHRcdFx0dmFyIHF1ZXJ5U3RyaW5nID0gT2JqZWN0LmtleXMoIHF1ZXJ5ICkubWFwKCAoIGtleSApID0+IHsgcmV0dXJuIGAke2tleX09JHtxdWVyeVsga2V5IF19YDsgfSApLmpvaW4oICcmJyApO1xuXG5cdFx0XHQvLyBDb25zdHJ1Y3QgcmVxdWVzdCBlbmRwb2ludC5cblx0XHRcdHZhciB1cmwgPSBgaHR0cHM6Ly9zb2NpYWwtcHJveHkuaGVyb2t1YXBwLmNvbS9pbnN0YWdyYW0vJHtoYW5kbGV9PyR7cXVlcnlTdHJpbmd9YDtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgcmVxdWVzdGVkIGRhdGEgaGFzIGJlZW4gZmV0Y2hlZC9jYWNoZWQuXG5cdFx0XHR2YXIgY2FjaGVkRGF0YSA9IF90aGlzLnJlZi5jYWNoZS5nZXRDYWNoZSggeyBwbGF0Zm9ybTogJ2luc3RhZ3JhbScsIGhhbmRsZSwgdXJsIH0gKTtcblxuXHRcdFx0dmFyIHJlcSA9IG51bGw7XG5cblx0XHRcdC8vIFJldHVybiBjYWNoZWQgZGF0YSBpZjpcblx0XHRcdC8vIC0gJ2J1c3QgY2FjaGUnIHNldCB0byBmYWxzZS5cblx0XHRcdC8vIC0gZGF0YSBleGlzdHMuXG5cdFx0XHQvLyAtIGRhdGEgaXMgbm90IGV4cGlyZWQuXG5cdFx0XHQvLyBPdGhlcndpc2UsIGZldGNoIG5ldyBkYXRhLlxuXHRcdFx0aWYgKCAhb3B0aW9ucy5idXN0Q2FjaGUgJiYgY2FjaGVkRGF0YSAmJiAhY2FjaGVkRGF0YS5zb2NpYWxQcm94eS5pc0V4cGlyZWQgKSB7XG5cdFx0XHRcdHJlc29sdmUoIGNhY2hlZERhdGEgKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblx0XHRcdFx0cmVxLm9wZW4oICdHRVQnLCB1cmwgKTtcblxuXHRcdFx0XHRyZXEub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0aWYgKCB0aGlzLnJlYWR5U3RhdGUgPT09IDQgKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3RhdHVzOiBhbnkgPSB0aGlzLnN0YXR1cztcblxuXHRcdFx0XHRcdFx0aWYgKCBwYXJzZUludCggc3RhdHVzICkgPT09IDIwMCApIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoICEhb3B0aW9ucy5jYWNoZSApIHtcblx0XHRcdFx0XHRcdFx0XHRfdGhpcy5yZWYuY2FjaGUuc2V0Q2FjaGUoIEpTT04ucGFyc2UoIHRoaXMucmVzcG9uc2UgKSwge1xuXHRcdFx0XHRcdFx0XHRcdFx0cGxhdGZvcm06ICdpbnN0YWdyYW0nLFxuXHRcdFx0XHRcdFx0XHRcdFx0aGFuZGxlLFxuXHRcdFx0XHRcdFx0XHRcdFx0dXJsLFxuXHRcdFx0XHRcdFx0XHRcdFx0dHRsLFxuXHRcdFx0XHRcdFx0XHRcdH0gKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUoIEpTT04ucGFyc2UoIHRoaXMucmVzcG9uc2UgKSApO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0cmVqZWN0KCB0aGlzLnJlc3BvbnNlIHx8IHRoaXMuc3RhdHVzVGV4dCApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJlcS5zZW5kKCk7XG5cdFx0XHR9XG5cdFx0fSApO1xuXHR9XG59XG4iXX0=