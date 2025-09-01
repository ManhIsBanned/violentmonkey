// ==UserScript==
// @name        Enhanced Anti-bot detection
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       none
// @version     1.1
// @author      -
// @description Evades detection by spoofing browser properties.
// @run-at      document-start
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
        // Some detection scripts check for the presence of properties like `chrome.runtime`
        // in non-extension contexts. While we can't remove it without breaking things,
        // we can clean up other potential giveaways if needed.
        // For now, we keep it simple to avoid breaking legitimate functionality.
    }

})();
