const fs = require("fs");
const amqplib = require("amqplib");

module.exports = () => {
  fs.watch("../entry", (event, file) => {
    console.log(`event type is: ${event}`);

    if (file) {
      console.log(`file provided: ${file}`);
      addToQueue(file);
    }
  });
};

async function addToQueue(file) {
  const q = "file";

  const conn = await amqplib.connect(process.env.RABBIT);
  const ch = await conn.createChannel();
  await ch.assertQueue(q);
  return ch.sendToQueue(q, Buffer.from(file, "utf8"));
}
