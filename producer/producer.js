const amqp = require("amqplib");
const fs = require("fs");

module.exports.start = async () => {
  const connection = await amqp.connect(process.env.MESSAGE_QUEUE);

  const channel = await connection.createChannel();
  await channel.assertQueue("tasks", { durable: true });

  fs.watch("/data/entry", async (event, fileName) => {
    console.log(`event type is: ${event} and ${fileName}`);

    const task = { message: `Task ${fileName}` };

    await channel.sendToQueue("tasks", Buffer.from(JSON.stringify(task)), {
      contentType: "application/json",
      persistent: true
    });

    console.info(`Task ${filName} sent!`);

    const fileNameWithDate = `${new Date().getTime()}_`.concat(fileName);

    fs.copyFile(
      `/data/entry/${fileName}`,
      `/data/output/${fileNameWithDate}`,
      err => {
        if (err) throw err;

        console.log(`${fileName} was copied`);
      }
    );
  });
};
