require("dotenv").config();

const express = require("express");
const app = express();

const { PORT = 5001 } = process.env;

const broker = require("./consumer");

setTimeout(() => {
  broker.start().catch(err => console.error(err));
}, 8000);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
