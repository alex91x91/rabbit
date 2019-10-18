require("dotenv").config();

const express = require("express");
const app = express();

const { PORT } = process.env;

const broker = require("./producer");

setTimeout(() => {
  broker.start().catch(err => console.error(err));
}, 10000);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
