// ==UserScript==
// @name         Anti-Automation Tab + UA (Updated 2024)
// @namespace    http://test.local
// @version      5.0
// @description  Random fingerprint + User-Agent riêng cho mỗi tab với UA mới nhất
// @match        https://sso.garena.com*
// @match        https://account.garena.com*
// @match        https://*.garena.com*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("🚀 Anti-Automation (Tab + UA) script starting v5.0...");

    function randomChoice(arr) { return arr[Math.floor(Math.random()*arr.length)]; }

    // ---- 1. Generate tab fingerprint với UA mới nhất ----
    function generateRandomFP() {
        const currentUserAgents = [
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
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0",
            
            // Mobile-like (cho đa dạng)
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Mobile",
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Mobile"
        ];

        return {
            languages: randomChoice([
                ['en-US','en'], 
                ['vi-VN','vi','en']
            ]),
            plugins: new Array(Math.floor(Math.random()*8)+2).fill(0), // 2-9 plugins
            platform: randomChoice(['Win32','Win64','MacIntel','Linux x86_64','Linux armv7l']),
            hardwareConcurrency: randomChoice([2,4,6,8,12,16]),
            deviceMemory: randomChoice([2,4,8,16,32]),
            maxTouchPoints: randomChoice([0,1,2,5,10]),
            vendor: randomChoice([
                "Intel Inc.",
                "NVIDIA Corporation", 
                "AMD",
                "Apple Inc.",
                "Qualcomm",
                "ARM"
            ]),
            renderer: randomChoice([
                "Intel Iris OpenGL Engine",
                "NVIDIA GeForce RTX 3060/PCIe/SSE2",
                "NVIDIA GeForce RTX 4070/PCIe/SSE2", 
                "AMD Radeon Pro 560X OpenGL Engine",
                "AMD Radeon RX 6700 XT",
                "Apple M1",
                "Apple M2",
                "Intel UHD Graphics 630",
                "ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0)"
            ]),
            userAgent: randomChoice(currentUserAgents),
            // Thêm screen resolution
            screenWidth: randomChoice([1920, 1366, 1536, 1440, 2560, 1280]),
            screenHeight: randomChoice([1080, 768, 864, 900, 1440, 720]),
            // Thêm timezone
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
    
    // Override automation detection
    Object.defineProperty(window, 'chrome', {
        get: () => ({
            runtime: {},
            loadTimes: function() {},
            csi: function() {},
            app: {}
        })
    });

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