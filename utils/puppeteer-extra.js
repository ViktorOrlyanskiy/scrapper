import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

import { writeFile } from "./writeFile.js";

puppeteer.use(StealthPlugin());

const URL = "https://bot.sannysoft.com/";
const TIMEOUT = 4000;

puppeteer
    .launch({ headless: true, args: ["--no-sandbox"] })
    .then(async (browser) => {
        console.log("Running tests..");

        const page = await browser.newPage({
            arg: ["--window-size=1900x1080"],
        });

        const context = browser.defaultBrowserContext();
        await context.overridePermissions(URL, ["geolocation"]);
        // set current location to Tokyo Station
        const client = await page.target().createCDPSession();
        await client.send("Emulation.setGeolocationOverride", {
            latitude: 59.93,
            longitude: 30.31,
            accuracy: 100,
        });

        await page.goto(URL);
        await page.waitForTimeout(TIMEOUT);

        const content = await page.content();
        writeFile("content", content);

        await page.screenshot({ path: "testresult.png", fullPage: true });
        await browser.close();
        console.log(`All done, check the screenshot. ✨`);
    });
