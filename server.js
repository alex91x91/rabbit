require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const amqp = require("amqplib/callback_api");

const { PORT } = process.env;

setTimeout(() => {
  amqp.connect(process.env.MESSAGE_QUEUE, function(error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function(error1, channel) {
      if (error1) {
        throw error1;
      }

      const queue = "hello";
      const msg = "Hello Alex!";

      channel.assertQueue(queue, {
        durable: false
      });
      channel.sendToQueue(queue, Buffer.from(msg));

      console.log(" [x] Sent %s", msg);
    });
  });
}, 10000);

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
