const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const { Schema } = mongoose;

const schema = new Schema({
  nama: { type: String, default: "" },
  password: { type: String, default: "" },
  email: { type: String, default: "" },
  kabupaten: { type: String, default: "" },
  tgl_lahir: { type: String, default: "" },
  alamat: { type: String, default: "" },
  image: { type: String, default: "" },
  sewaItem: [
    {
      type: Schema.Types.ObjectId,
      ref: "SewaItem",
    },
  ],
  oauth_id: {
    type: String,
    unique: true,
    index: true
  },
  avatar: { type: String, default: "" }
});


// generating a hash
schema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
schema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", schema);
