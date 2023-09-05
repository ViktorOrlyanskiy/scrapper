import cheerio from "cherio";
import chalk from "chalk";
import fs from "fs";

import { getPageContent } from "./utils/puppeteer.js";
import { writeFile } from "./utils/writeFile.js";

const URL1 =
    "https://sbermarket.ru/auchan/yogurt-kirzhachskiy-molochnyy-zavod-3-bzmzh-450-g?sid=278";
const URL2 =
    "https://sbermarket.ru/auchan/klubnika-polvit-zamorozhennaya-300-g?sid=278";
const URL3 =
    "https://sbermarket.ru/auchan/makaronnye-izdeliya-shebekinskie-202-rozhok-polubublik-iz-tverdyh-sortov-pshenitsy-450-g-14aeba5?sid=278";
const URL4 =
    "https://sbermarket.ru/auchan/suhoy-korm-purina-one-sterilized-s-kuritsey-i-tsel-nymi-zlakami-dlya-sterilizovannyh-koshek-750-g-bc09344?sid=278";
const URL5 =
    "https://sbermarket.ru/auchan/yaytso-kurinoe-sinyavinskoe-so-30-sht-4448b09?sid=278";
const PRODUCTS = [URL1, URL2, URL3, URL4, URL5];

const main = async () => {
    try {
        const prices = [];
        for (const link of PRODUCTS) {
            const pageContent = await getPageContent(link);
            const $ = cheerio.load(pageContent);

            const targetElement = $("[data-qa=meta-price]");
            const price = targetElement.attr("content");

            prices.push(price);
        }

        console.log(prices);
    } catch (err) {
        console.log(chalk.red("An error has occurred \n"));
        console.log(err);
    }
};
main();
