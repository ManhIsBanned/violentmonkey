// ==UserScript==
// @name         Simulate Keyboard Typing
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Giả lập sự kiện gõ phím trên input để tránh bị phát hiện là bot
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function simulateTyping(element, text, delay = 150) {
        let index = 0;

        const interval = setInterval(() => {
            if (index >= text.length) {
                clearInterval(interval);
                return;
            }

            const char = text[index];

            // Tạo sự kiện keydown
            element.dispatchEvent(new KeyboardEvent('keydown', {
                key: char,
                code: `Key${char.toUpperCase()}`,
                bubbles: true
            }));

            // Tạo sự kiện keypress
            element.dispatchEvent(new KeyboardEvent('keypress', {
                key: char,
                code: `Key${char.toUpperCase()}`,
                bubbles: true
            }));

            // Gán giá trị
            element.value += char;

            // Sự kiện input để kích hoạt listeners
            element.dispatchEvent(new Event('input', { bubbles: true }));

            // Tạo sự kiện keyup
            element.dispatchEvent(new KeyboardEvent('keyup', {
                key: char,
                code: `Key${char.toUpperCase()}`,
                bubbles: true
            }));

            index++;
        }, delay + Math.random() * 100); // delay ngẫu nhiên
    }

    // ▶️ Tự động chạy khi trang sẵn sàng
    window.addEventListener('load', () => {
        const input = document.querySelector('input[type="text"], input[name="username"], input'); // tuỳ trang

        if (input) {
            input.focus();
            simulateTyping(input, "testuser123"); // <-- Thay bằng username bạn muốn gõ
        } else {
            console.log("❌ Không tìm thấy ô input để gõ.");
        }
    });

})();
