const amqp = require("amqplib/callback_api");

module.exports = file => {
  setTimeout(() => {
    amqp.connect("amqp://rabbitmq", function(error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function(error1, channel) {
        if (error1) {
          throw error1;
        }

        const queue = "hello";
        const msg = "Hello World!";

        channel.assertQueue(queue, {
          durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
      });
    });
  }, 10000);
};
