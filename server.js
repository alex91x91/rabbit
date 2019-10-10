require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");

const { PORT } = process.env;

const send = require("./send");

fs.watch("./data/entry", (event, fileName) => {
  console.log(`event type is: ${event} and ${fileName}`);

  send(fileName);

  const fileNameWithDate = `${new Date().getTime()}_`.concat(fileName);

  fs.copyFile(
    `./data/entry/${fileName}`,
    `./data/output/${fileNameWithDate}`,
    err => {
      if (err) throw err;

      console.log(`${fileName} was copied`);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
