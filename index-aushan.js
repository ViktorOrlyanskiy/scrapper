import cheerio from "cherio";
import chalk from "chalk";
import fs from "fs";

import { arrayFromLength } from "./utils/common.js";
import { getPageContent } from "./utils/puppeteer.js";
import { writeFile } from "./utils/writeFile.js";

const URL1 = "https://www.auchan.ru/product/klubnika-zam-0-3kg/";
const URL2 = "https://www.auchan.ru/product/chernika-kazhdyy-den-300-g/";
const URL3 = "https://www.auchan.ru/product/pelmeni-premium-cezar-600g/";
const URL4 = "https://www.auchan.ru/product/kp-ovoshchnoe-trio-gril-400g/";

const PRODUCTS = [URL1, URL2, URL3, URL4];

const main = async () => {
    try {
        const prices = [];
        for (const link of PRODUCTS) {
            const pageContent = await getPageContent(link);
            const $ = cheerio.load(pageContent);

            const parentTargetElement = $("[id=productName]").next();
            const firstChildrenTargetElement = $(parentTargetElement)
                .find("span")
                .filter((i, span) => {
                    return $(span).text() === "C";
                });

            const targetElement = $(firstChildrenTargetElement).parent();
            const price = targetElement.text().replace(/[^0-9.]/g, "");
            prices.push(price);
        }

        console.log(prices);
    } catch (err) {
        console.log(chalk.red("An error has occurred \n"));
        console.log(err);
    }
};
main();
