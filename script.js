// ==UserScript==
// @name         Anti-Automation Tab + UA (Updated 2024)
// @namespace    http://test.local
// @version      5.0
// @description  Random fingerprint + User-Agent riêng cho mỗi tab với UA mới nhất
// @match        https://sso.garena.com/universal/register*
// @match        https://account.garena.com*
// @match        https://sso.garena.com*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // --- Helper function to safely modify properties ---
    const safeDefineProperty = (obj, prop, value) => {
        try {
            Object.defineProperty(obj, prop, value);
        } catch (e) {
            // Suppress errors in case property is not configurable
        }
    };

    // 1. Hide the webdriver flag
    if (navigator.webdriver) {
        safeDefineProperty(navigator, 'webdriver', {
            get: () => false,
        });
    }

    // 2. Spoof plugins and mimeTypes to appear more genuine
    const plugins = [
        { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format', mimeTypes: [{ type: 'application/pdf', suffixes: 'pdf' }] },
        { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: '', mimeTypes: [{ type: 'application/pdf', suffixes: 'pdf' }] },
        { name: 'Native Client', filename: 'internal-nacl-plugin', description: '', mimeTypes: [{ type: 'application/x-nacl', suffixes: '' }, { type: 'application/x-pnacl', suffixes: '' }] }
    ];

    const mimeTypes = [
        { type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format' },
        { type: 'application/x-nacl', suffixes: '', description: '' },
        { type: 'application/x-pnacl', suffixes: '', description: '' }
    ];

    const createPluginArray = (pluginsData) => {
        const pluginArray = {
            length: pluginsData.length,
            item: (index) => pluginArray[index],
            namedItem: (name) => {
                for (const plugin of pluginArray) {
                    if (plugin.name === name) return plugin;
                }
                return null;
            },
            refresh: () => {}
        };
        pluginsData.forEach((p, i) => {
            const mimeTypeArray = {
                length: p.mimeTypes.length,
                item: (index) => mimeTypeArray[index],
                namedItem: (name) => {
                    for (const mime of mimeTypeArray) {
                        if (mime.type === name) return mime;
                    }
                    return null;
                }
            };
            p.mimeTypes.forEach((m, j) => {
                m.enabledPlugin = p;
                mimeTypeArray[j] = m;
            });
            Object.setPrototypeOf(p, Plugin.prototype);
            Object.setPrototypeOf(mimeTypeArray, MimeTypeArray.prototype);
            p.length = p.mimeTypes.length;
            p.item = mimeTypeArray.item;
            p.namedItem = mimeTypeArray.namedItem;
            pluginArray[i] = p;
        });
        Object.setPrototypeOf(pluginArray, PluginArray.prototype);
        return pluginArray;
    };

    const createMimeTypeArray = (mimeTypesData) => {
        const mimeTypeArray = {
            length: mimeTypesData.length,
            item: (index) => mimeTypeArray[index],
            namedItem: (name) => {
                for (const mime of mimeTypeArray) {
                    if (mime.type === name) return mime;
                }
                return null;
            }
        };
        mimeTypesData.forEach((m, i) => {
            Object.setPrototypeOf(m, MimeType.prototype);
            mimeTypeArray[i] = m;
        });
        Object.setPrototypeOf(mimeTypeArray, MimeTypeArray.prototype);
        return mimeTypeArray;
    };

    safeDefineProperty(navigator, 'plugins', { get: () => createPluginArray(plugins) });
    safeDefineProperty(navigator, 'mimeTypes', { get: () => createMimeTypeArray(mimeTypes) });

    // 3. Normalize Permissions API
    const originalQuery = navigator.permissions.query;
    safeDefineProperty(navigator.permissions, 'query', {
        value: (parameters) => {
            if (parameters.name === 'notifications') {
                return Promise.resolve({ state: 'prompt' });
            }
            return originalQuery.apply(navigator.permissions, [parameters]);
        }
    });

    // 4. Spoof WebGL renderer info
    try {
        const getParameter = WebGLRenderingContext.prototype.getParameter;
        WebGLRenderingContext.prototype.getParameter = function(parameter) {
            if (parameter === 37445) { // UNMASKED_VENDOR_WEBGL
                return 'Intel Inc.';
            }
            if (parameter === 37446) { // UNMASKED_RENDERER_WEBGL
                return 'Intel Iris OpenGL Engine';
            }
            return getParameter.apply(this, arguments);
        };
    } catch (e) {}

    // 5. Clean the window.chrome object
    if (window.chrome) {
        // For now, we keep it simple to avoid breaking legitimate functionality.
    }

    // 6. Spoof mobile network connection
    if (navigator.connection) {
        const connection = {
            downlink: 10,
            effectiveType: '4g',
            rtt: 50,
            saveData: false,
            type: 'cellular'
        };
        safeDefineProperty(navigator, 'connection', {
            get: () => connection
        });
    }

    // 7. Humanize navigation timing (pushState/replaceState)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    const humanizedStateChange = (originalFunc) => {
        return function(...args) {
            const delay = Math.random() * 100 + 50; // Random delay between 50ms and 150ms
            setTimeout(() => {
                originalFunc.apply(this, args);
            }, delay);
        };
    };

    history.pushState = humanizedStateChange(originalPushState);
    history.replaceState = humanizedStateChange(originalReplaceState);

})();
