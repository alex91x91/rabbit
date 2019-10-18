const amqp = require("amqplib");
const fs = require("fs");
const delay = require("./delay");

module.exports.start = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  const channel = await connection.createChannel();
  await channel.assertQueue("tasks", { durable: true });
  await channel.prefetch(1);

  console.info("Waiting tasks...");

  channel.consume("tasks", async message => {
    await delay(1000);

    const content = message.content.toString();

    const task = JSON.parse(content);

    channel.ack(message);

    console.info(`${task.message} received!`);

    const cutted = task.message.toString().slice(5);

    const fileNameWithDate = `${new Date().getTime()}_`.concat(cutted);

    fs.copyFile(
      `/data/entry/${cutted}`,
      `/data/output/${fileNameWithDate}`,
      err => {
        if (err) throw err;

        console.log(`${cutted} was copied into output folder`);
      }
    );
  });
};
