// @ts-check
const { test, expect, chromium } = require('@playwright/test');

test('video record', async ({ page }) => {

    const browser = await chromium.launch({
        headless: false,
        slowMo: 500
    })

    const context = await browser.newContext({
        recordVideo: {
            dir: 'videos/',
            size: { width: 800, height: 600 }
        }
    })
    await page.goto('');

    await context.close();
});
