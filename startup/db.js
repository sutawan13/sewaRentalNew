const mongoose = require("mongoose");
const key = require("../config/variabel/keys-variabel.js");

class database {
  constructor() {
    this.connect();
  }
  async connect() {
    try {
      await mongoose.connect(key.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      });
      console.log("Database connected!");
    } catch (e) {
      console.error(e);
    }
  }
}

exports.database = new database();
