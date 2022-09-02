const mongoose = require("mongoose");

const { CUSTOMCONNSTR_DB } = process.env;

exports.connect = () => {
  console.info("Connecting to the database...");
  // Connecting to the database
  mongoose
    .connect(CUSTOMCONNSTR_DB || "mongodb://localhost:27017/local", {
      useUnifiedTopology: true,
      /*useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,*/
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.error({ message: error });
      process.exit(1);
    });
};
