require("dotenv").config();

const express = require("express");
const app = express();
// const fs = require("fs");

const { PORT = 5001 } = process.env;

const broker = require("./consumer");

setTimeout(() => {
  broker.start().catch(err => console.error(err));
}, 6000);

// fs.watch("./data/entry", (event, fileName) => {
//   console.log(`event type is: ${event} and ${fileName}`);

//   const fileNameWithDate = `${new Date().getTime()}_`.concat(fileName);

//   fs.copyFile(
//     `./data/entry/${fileName}`,
//     `./data/output/${fileNameWithDate}`,
//     err => {
//       if (err) throw err;

//       console.log(`${fileName} was copied`);
//     }
//   );
// });

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
