import puppeteer from "puppeteer";

import { autoScroll } from "./utils.js";

export const scrapeRentals = async () => {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(process.env.SCRAPE_URL_QUERY, { waitUntil: "networkidle0" });
  // scroll to the bottom until there are no more results
  await autoScroll(page);

  // get all properties, {id, title} that are visible
  const propertyItems = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#property-data > a")).map((el) => {
      const id = el.getAttribute("href").substring(1);
      console.log(id);
      const title = el.querySelector(".listing-title").innerText;
      return { id, title };
    })
  );
  await browser.close();

  return propertyItems;
};
