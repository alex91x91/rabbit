require("dotenv").config();

const express = require("express");
const app = express();

const { PORT } = process.env;

app.get("/", (req, res) => {
  res.json({
    name: "Alex"
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
