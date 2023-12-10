const amqp = require("amqplib");

async function createConnection() {
  try {
    const connectionString = "amqp://ethem:123@localhost:5672/ethemvhost";
    const connection = await amqp.connect(connectionString);
    return connection;
  } catch (error) {
    throw new Error("Rabbitmq baglantisi kurulamadi");
  }
}

module.exports = createConnection;
