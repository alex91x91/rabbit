require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const amqp = require("amqplib");

const { PORT } = process.env;

const q = "tasks";

amqp
  .connect(process.env.RABBIT)
  .then((err, conn) => {
    return conn.createChannel();
  })
  .then(function(ch) {
    return ch.assertQueue(q).then(function(ok) {
      return ch.sendToQueue(q, Buffer.from("something to do"));
    });
  })
  .catch(err => console.log(err));

fs.watch("./entry", (event, fileName) => {
  console.log(`event type is: ${event} and ${fileName}`);

  const fileNameWithDate = `${new Date().getTime()}_`.concat(fileName);

  fs.copyFile(`./entry/${fileName}`, `./output/${fileNameWithDate}`, err => {
    if (err) throw err;

    console.log(`${fileName} was copied`);
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
