import cheerio from "cherio";
import { readFileSync } from "./readFileSync.js";
import { writeFile } from "./writeFile.js";

const filePath = "content.html";
const fileContent = readFileSync(filePath);

const $ = cheerio.load(fileContent);

// ---- ПОЛУЧЕНИЕ PRICE
const parentElement = $("[data-widget=webPrice]");
const buttonElement = $(parentElement).find("button");

let arraySpans;
let price = null;
if (buttonElement.length !== 0) {
    arraySpans = getArraySpans(buttonElement);
    price = Number(arraySpans[1].replace(/[\s₽]/g, ""));
} else {
    arraySpans = getArraySpans(parentElement);
    price = Number(arraySpans[0].replace(/[\s₽]/g, ""));
}

console.log("price", price);

function getArraySpans(params) {
    const arraySpans = [];

    function recursiveTraversal(element) {
        element.children().each((index, child) => {
            const $child = $(child);
            if ($child.prop("tagName") === "SPAN") {
                arraySpans.push($child.text());
            }

            recursiveTraversal($child);
        });
    }

    recursiveTraversal(params);

    return arraySpans;
}

// --------------------------------------

// ---- ПОЛУЧЕНИЕ IMAGE

const imageElement = $('[data-hid="property::og:image"]');
const linkImage = imageElement.attr("content");

console.log("content", linkImage);

// --------------------------------------

// ---- ПОЛУЧЕНИЕ NAME

const titleElement = $("title");
console.log("name", titleElement.text());

// --------------------------------------

console.log("finish");
