import { readFileSync, writeFileSync } from "fs";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { sendEmail } from "./sendEmail.js";
import { scrapeRentals } from "./scrapeRentals.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
dotenv.config();

export const notifyNewRentals = async () => {
  const propertyItems = await scrapeRentals();
  // read the old proterty id json array file
  const oldPropertyIds = JSON.parse(
    readFileSync(path.join(dirname, "../data/oldPropertyIds.json"), "utf8")
  );

  // filter through all the property ids on the page and check if they are in the old property id json array file
  const newPropertyItems = propertyItems.filter(
    ({ id }) => !oldPropertyIds.includes(id)
  );

  // if there are new property ids, send an email with the new property ids
  if (newPropertyItems.length > 0) {
    sendEmail(newPropertyItems);
    // and save the updated property ids to a json file as oldProperties.json, to compare for the next iteration
    const allPropertyIds = propertyItems.map(({ id }) => id);
    const allProperyIdsString = JSON.stringify(allPropertyIds);
    writeFileSync(
      path.join(dirname, "../data/oldPropertyIds.json"),
      allProperyIdsString,
      "utf8"
    );
  }
};
