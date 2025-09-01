// ==UserScript==
// @name         Anti-Bot Fingerprint Spoof
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fake navigator/browser properties to avoid bot detection
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // ✅ Fake userAgent (giống Android thật)
    Object.defineProperty(navigator, 'userAgent', {
        get: () => "Mozilla/5.0 (Linux; Android 12; Pixel 6 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36"
    });

    // ✅ Fake webdriver = false
    Object.defineProperty(navigator, 'webdriver', {
        get: () => false
    });

    // ✅ Fake ngôn ngữ trình duyệt
    Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en']
    });

    // ✅ Fake platform
    Object.defineProperty(navigator, 'platform', {
        get: () => 'Linux armv8l'
    });

    // ✅ Fake plugins (trình giả lập thường có 0)
    Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3]
    });

    // ✅ Fake navigator.chrome
    Object.defineProperty(navigator, 'chrome', {
        get: () => ({ runtime: {} })
    });

    // ✅ Fake permissions check
    const originalQuery = window.navigator.permissions.query;
    window.navigator.permissions.query = (parameters) =>
        parameters.name === 'notifications'
            ? Promise.resolve({ state: Notification.permission })
            : originalQuery(parameters);

    // ✅ Fake kích thước màn hình ngoài (headless thường bất thường)
    Object.defineProperty(window, 'outerWidth', {
        get: () => window.innerWidth + 100
    });
    Object.defineProperty(window, 'outerHeight', {
        get: () => window.innerHeight + 100
    });

    console.log("[✅ Anti-Bot Script] Trình duyệt đã được fake thông tin thành công.");
})();
