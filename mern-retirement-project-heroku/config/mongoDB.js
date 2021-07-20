const mongoose = require("mongoose");
const config = require("config");
const db = config.get("CONNECTION_STRING");

const connectDB = () => {
  mongoose
    .connect(db, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(() => console.log("connected to mongodb"))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
