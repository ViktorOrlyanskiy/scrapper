import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

const LAUNCH_PUPPETEER_OPTIONS = { headless: true };
const PAGE_OPTIONS = { arg: ["--no-sandbox"] };

const URL = "https://www.auchan.ru/product/klubnika-zam-0-3kg/";
const TIMEOUT = 4000;

puppeteer.use(StealthPlugin());

export const getPageContent = async (url) => {
    try {
        const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTIONS);
        const page = await browser.newPage(PAGE_OPTIONS);

        const context = browser.defaultBrowserContext();
        await context.overridePermissions(URL, ["geolocation"]);
        // set current location to Saint Petersburg
        const client = await page.target().createCDPSession();
        await client.send("Emulation.setGeolocationOverride", {
            latitude: 59.93,
            longitude: 30.31,
            accuracy: 100,
        });

        await page.goto(url);
        await page.waitForTimeout(TIMEOUT);
        const content = await page.content();

        browser.close();

        return content;
    } catch (err) {
        throw err;
    }
};
