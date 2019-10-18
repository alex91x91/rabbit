const amqp = require("amqplib");
const fs = require("fs");

module.exports.start = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  const channel = await connection.createChannel();
  await channel.assertQueue("tasks", { durable: true });

  fs.watch("/data/entry", async (event, fileName) => {
    const task = { message: `Task ${fileName}` };

    console.log(`${fileName} was added to entry folder`);

    await channel.sendToQueue("tasks", Buffer.from(JSON.stringify(task)), {
      contentType: "application/json",
      persistent: true
    });

    console.info(`Task ${fileName} sent!`);
  });
};
