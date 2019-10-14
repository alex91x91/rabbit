require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");

const { PORT } = process.env;

const broker = require("./producer");

setTimeout(() => {
  broker.start().catch(err => console.error(err));
}, 8000);

// fs.watch("./entry", (event, fileName) => {
//   console.log(`event type is: ${event} and ${fileName}`);

//   const fileNameWithDate = `${new Date().getTime()}_`.concat(fileName);

//   fs.copyFile(`./entry/${fileName}`, `./output/${fileNameWithDate}`, err => {
//     if (err) throw err;

//     console.log(`${fileName} was copied`);
//   });
// });

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
