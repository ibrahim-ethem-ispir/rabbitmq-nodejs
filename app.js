const express = require("express");
const colors = require("@colors/colors");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// RabbitMQ bağlantısı oluştur
const createConnection = require("./connectionRabbitmq");

// mongodb bağlantısı
require("./dbConnection");

// mesajları işlme
require("./consumer");

// Kuyruğa mesaj gönder
async function sendMessage(queueName, message) {
  const connection = await createConnection();
  const channel = await connection.createChannel();

  await channel.assertQueue(queueName, { durable: true });
  channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });

  console.log(colors.bgRed(` Mesaj gönderildi: ${message} `));

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

app.post("/send-message", (req, res) => {
  const { message } = req.body;
  sendMessage("ethem-test-queue", message);
  res.send("Mesaj gönderildi!");
});

app.listen(port, () => {
  console.log(`Express uygulaması çalışıyor: http://localhost:${port}`);
});
