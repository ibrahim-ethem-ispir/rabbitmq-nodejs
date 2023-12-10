const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/rabbitmq", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Veritabanına Başarıyla Bağlandı");
  })
  .catch((err) => {
    console.log("Veritabanına Bağlanılamadı : " + err);
  });
