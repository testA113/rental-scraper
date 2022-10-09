import express from "express";

import { notifyNewRentals } from "./src/notifyNewRentals.js";

const port = process.env.PORT || 8080;

const app = express().get("/", async (_, res) => {
  try {
    await notifyNewRentals();
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Rentals scraped");
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Error scraping rentals");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
