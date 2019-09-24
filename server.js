require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const amqplib = require("amqplib");

const { PORT } = process.env;

async function addToQueue(file) {
  const q = "file";

  const conn = await amqplib.connect(process.env.RABBIT);
  const ch = await conn.createChannel();
  await ch.assertQueue(q);
  return ch.sendToQueue(q, Buffer.from(file, "utf8"));
}

fs.watch("./entry", (event, fileName) => {
  console.log(`event type is: ${event} and ${fileName}`);
  const fileNameWithDate = `${new Date().getTime()}_`.concat(fileName);

  fs.copyFile(`./entry/${fileName}`, `./output/${fileNameWithDate}`, err => {
    if (err) {
      if (err) throw err;
    }
    console.log(`${fileName} was copied`);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
