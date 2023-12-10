const createConnection = require("./connectionRabbitmq");
const colors = require("@colors/colors");

async function consumeMessages(queueName) {
  const connection = await createConnection();
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });
  channel.consume(queueName, (msg) => {
    const message = msg.content.toString();
    console.log(colors.bgBrightBlue(` Mesaj alındı: ${message} `));

    // burada tekrardan rabbitmq ya iletilecek ve 3 dk sonra tekrar gelmesi söylenecek

    const success = true;

    if (success) {
      channel.ack(msg);
    } else {
      channel.nack(msg);
    }
  });

  console.log(colors.bgBrightYellow(` Mesaj dinleme başladı... `));
}

consumeMessages("ethem-test-queue");
