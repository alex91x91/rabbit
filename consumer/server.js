require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const amqp = require("amqplib/callback_api");

const { PORT = 5001 } = process.env;

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

      channel.assertQueue(queue, {
        durable: false
      });

      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );

      channel.consume(
        queue,
        function(msg) {
          console.log(" [x] Received %s", msg.content.toString());
        },
        {
          noAck: true
        }
      );
    });
  });
}, 8000);

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
