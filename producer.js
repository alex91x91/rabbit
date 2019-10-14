const amqp = require("amqplib");

module.exports.start = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  const channel = await connection.createChannel();
  await channel.assertQueue("tasks", { durable: true });

  const task = { message: `Task 1` };

  await channel.sendToQueue("tasks", Buffer.from(JSON.stringify(task)), {
    contentType: "application/json",
    persistent: true
  });

  console.info(`Task 1 sent!`);
};
