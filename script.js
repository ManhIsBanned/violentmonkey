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
    console.log("🚀 Anti-Automation (Tab + UA) script starting v5.0...");

    function randomChoice(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

    // New User-Agent lists
    const desktopUserAgents = [
        // Chrome 120-122 Windows (mới nhất 2024)
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
        
        // Chrome Windows 11
        "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        
        // Mac Chrome mới nhất
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        
        // Mac M1/M2
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
        
        // Linux Chrome
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
        
        // Edge mới nhất
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
        
        // Firefox mới nhất
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0"
    ];

    const mobileUserAgents = [
        // Android Chrome
        "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 12; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
        "Mozilla/5.0 (Linux; Android 14; SM-S901U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
        
        // iOS Safari/Chrome
        "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/121.0.0.0 Mobile/15E148 Safari/604.1",
        
        // Other mobile-like (from original list)
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Mobile",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Mobile"
    ];

    // New screen resolutions for mobile
    const mobileScreenResolutions = [
        [360, 640], [375, 667], [414, 896], [390, 844], [428, 926], // Common phone resolutions
        [768, 1024], [810, 1080], [834, 1194], // Common tablet resolutions
        [320, 568], [375, 812] // Older/smaller phones
    ];

    // New platforms for mobile
    const mobilePlatforms = ['Android', 'iPhone', 'iPad', 'Linux armv7l']; // Keep Linux armv7l for some Androids
    const desktopPlatforms = ['Win32', 'Win64', 'MacIntel', 'Linux x86_64'];

    // ---- 1. Generate tab fingerprint với UA mới nhất ----
    function generateRandomFP() {
        // Always generate a mobile fingerprint
        const selectedUA = randomChoice(mobileUserAgents);
        let selectedPlatform;
        let selectedScreenResolution = randomChoice(mobileScreenResolutions);

        if (selectedUA.includes("Android")) {
            selectedPlatform = "Android";
        } else if (selectedUA.includes("iPhone")) {
            selectedPlatform = "iPhone";
        } else if (selectedUA.includes("iPad")) {
            selectedPlatform = "iPad";
        } else {
            selectedPlatform = randomChoice(mobilePlatforms); // Fallback for other mobile-like UAs
        }

        return {
            languages: randomChoice([
                ['en-US','en'], 
                ['vi-VN','vi','en']
            ]),
            plugins: new Array(Math.floor(Math.random()*8)+2).fill(0), // 2-9 plugins
            platform: selectedPlatform,
            hardwareConcurrency: randomChoice([2,4,6,8]), // More typical for mobile
            deviceMemory: randomChoice([2,4,6,8]), // More typical for mobile
            maxTouchPoints: randomChoice([1,2,5]), // Mobile devices have touch points
            vendor: randomChoice([
                "Google Inc.", // Common for Android
                "Apple Inc.", // Common for iOS
                "Qualcomm",
                "ARM"
            ]),
            renderer: randomChoice([
                "Adreno (TM) 650", // Common Android GPU
                "Apple GPU", // Common iOS GPU
                "Mali-G77 MC9", // Common Android GPU
                "ANGLE (Google, Vulkan 1.2.0 (SwiftShader), SwiftShader)", // Software renderer
                "ANGLE (Apple, Apple M1 GPU, OpenGL 4.1)"
            ]),
            userAgent: selectedUA,
            screenWidth: selectedScreenResolution[0],
            screenHeight: selectedScreenResolution[1],
            timezone: randomChoice([
                'Asia/Ho_Chi_Minh',
                'America/New_York', 
                'Europe/London',
                'Asia/Tokyo',
                'Asia/Seoul',
                'Australia/Sydney'
            ])
        };
    }

    // ---- 2. Store per tab in sessionStorage ----
    let tabFP;
    if(!sessionStorage.getItem('tabFP')){
        tabFP = generateRandomFP();
        sessionStorage.setItem('tabFP', JSON.stringify(tabFP));
        console.log("🆕 New fingerprint generated for this tab:", {
            userAgent: tabFP.userAgent.substring(0, 50) + "...",
            platform: tabFP.platform,
            languages: tabFP.languages,
            hardwareConcurrency: tabFP.hardwareConcurrency
        });
    } else {
        tabFP = JSON.parse(sessionStorage.getItem('tabFP'));
        console.log("♻️  Existing tab fingerprint loaded:", {
            userAgent: tabFP.userAgent.substring(0, 50) + "...",
            platform: tabFP.platform
        });
    }

    // ---- 3. Fake navigator properties ----
    Object.defineProperty(navigator, 'webdriver', {
        get: () => {
            console.log("🔍 webdriver property accessed - returning false");
            return false;
        }
    });
    
    Object.defineProperty(navigator, 'languages', {
        get: () => {
            console.log("🌐 languages property accessed:", tabFP.languages);
            return tabFP.languages;
        }
    });
    
    Object.defineProperty(navigator, 'plugins', {
        get: () => {
            console.log("🔌 plugins property accessed, count:", tabFP.plugins.length);
            return tabFP.plugins;
        }
    });
    
    Object.defineProperty(navigator, 'platform', {
        get: () => {
            console.log("💻 platform property accessed:", tabFP.platform);
            return tabFP.platform;
        }
    });
    
    Object.defineProperty(navigator, 'hardwareConcurrency', {
        get: () => {
            console.log("⚡ hardwareConcurrency accessed:", tabFP.hardwareConcurrency);
            return tabFP.hardwareConcurrency;
        }
    });
    
    Object.defineProperty(navigator, 'deviceMemory', {
        get: () => {
            console.log("💾 deviceMemory accessed:", tabFP.deviceMemory);
            return tabFP.deviceMemory;
        }
    });
    
    Object.defineProperty(navigator, 'maxTouchPoints', {
        get: () => {
            console.log("👆 maxTouchPoints accessed:", tabFP.maxTouchPoints);
            return tabFP.maxTouchPoints;
        }
    });
    
    Object.defineProperty(navigator, 'userAgent', {
        get: () => {
            console.log("🕵️ userAgent accessed:", tabFP.userAgent);
            return tabFP.userAgent;
        }
    });

    // ---- 4. Fake Canvas fingerprinting ----
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function() {
        console.log("🎨 Canvas toDataURL called - adding noise");
        const ctx = this.getContext('2d');
        // Add random noise
        ctx.fillStyle = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
        ctx.fillRect(Math.random()*10, Math.random()*10, 1, 1);
        return originalToDataURL.apply(this, arguments);
    };

    // ---- 5. Fake WebGL fingerprinting ----
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(param) {
        if(param === 37445) { // UNMASKED_VENDOR_WEBGL
            console.log("🎮 WebGL vendor accessed:", tabFP.vendor);
            return tabFP.vendor;
        }
        if(param === 37446) { // UNMASKED_RENDERER_WEBGL  
            console.log("🎮 WebGL renderer accessed:", tabFP.renderer);
            return tabFP.renderer;
        }
        return originalGetParameter.apply(this, arguments);
    };

    // ---- 6. Fake Audio fingerprinting ----
    if(window.OfflineAudioContext || window.webkitOfflineAudioContext){
        const AudioCtx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
        const originalCreateBuffer = AudioCtx.prototype.createBuffer;
        AudioCtx.prototype.createBuffer = function() {
            console.log("🔊 Audio context buffer created - adding noise");
            const buffer = originalCreateBuffer.apply(this, arguments);
            const originalGetChannelData = buffer.getChannelData;
            buffer.getChannelData = function(channel) {
                const data = originalGetChannelData.call(this, channel);
                // Add subtle noise
                for(let i = 0; i < data.length; i++) {
                    data[i] += (Math.random() - 0.5) * 1e-6;
                }
                return data;
            };
            return buffer;
        };
    }

    // ---- 7. Fake Screen properties ----
    Object.defineProperty(screen, 'width', {
        get: () => {
            console.log("📺 screen.width accessed:", tabFP.screenWidth);
            return tabFP.screenWidth;
        }
    });
    
    Object.defineProperty(screen, 'height', {
        get: () => {
            console.log("📺 screen.height accessed:", tabFP.screenHeight);
            return tabFP.screenHeight;
        }
    });

    // ---- 8. Fake Timezone ----
    const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
    Date.prototype.getTimezoneOffset = function() {
        console.log("🌍 Timezone accessed:", tabFP.timezone);
        // Return offset based on fake timezone (simplified)
        const offsets = {
            'Asia/Ho_Chi_Minh': -420,
            'America/New_York': 300,
            'Europe/London': 0,
            'Asia/Tokyo': -540,
            'Asia/Seoul': -540,
            'Australia/Sydney': -660
        };
        return offsets[tabFP.timezone] || originalGetTimezoneOffset.apply(this);
    };

    // ---- 9. Simulate human behavior ----
    window.addEventListener('load', () => {
        // Random mouse movement
        setTimeout(() => {
            const evt = new MouseEvent('mousemove', {
                clientX: Math.random() * window.innerWidth,
                clientY: Math.random() * window.innerHeight,
                bubbles: true
            });
            document.dispatchEvent(evt);
            console.log("🖱️  Human-like mouse event dispatched");
        }, Math.random() * 2000 + 500);

        // Random scroll
        setTimeout(() => {
            window.scrollTo(0, Math.random() * 100);
            console.log("📜 Human-like scroll event dispatched");
        }, Math.random() * 3000 + 1000);
    });

    // ---- 10. Anti-detection for common checks ----
    // Hide automation indicators
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Array;
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Promise;
    delete window.cdc_adoQpoasnfa76pfcZLmcfl_Symbol;
    

    // ---- 11. Debug info ----
    console.log("✅ Anti-Automation Tab+UA script fully active with fingerprint:", {
        userAgent: tabFP.userAgent,
        platform: tabFP.platform,
        languages: tabFP.languages,
        hardwareConcurrency: tabFP.hardwareConcurrency,
        deviceMemory: tabFP.deviceMemory,
        vendor: tabFP.vendor,
        renderer: tabFP.renderer,
        screenSize: `${tabFP.screenWidth}x${tabFP.screenHeight}`,
        timezone: tabFP.timezone
    });

    // ---- 12. Test function để kiểm tra script hoạt động ----
    window.testAntiDetection = function() {
        console.log("🧪 Testing anti-detection script...");
        console.log("Navigator.webdriver:", navigator.webdriver);
        console.log("Navigator.userAgent:", navigator.userAgent);
        console.log("Navigator.platform:", navigator.platform);
        console.log("Navigator.languages:", navigator.languages);
        console.log("Navigator.hardwareConcurrency:", navigator.hardwareConcurrency);
        console.log("Screen size:", screen.width + "x" + screen.height);
        
        // Test canvas fingerprint
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Test fingerprint', 2, 2);
        console.log("Canvas fingerprint:", canvas.toDataURL().substring(0, 50) + "...");
        
        return "✅ Anti-detection script is working!";
    };

})();
