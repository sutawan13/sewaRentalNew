const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new Schema({
  subkategori: {type: String},
  kategori: {type: String},
  namaBarang: { type: String, default: "" },
  harga: { type: Number, default: 0 },
  alamat: { type: String, default: "" },
  kabupaten: { type: String, default: "" },
  provinsi: { type: String, default: "" },
  gambarBarang: { type: String, default: "" },
  deskripsi: { type: String, default: "" },
  jaminan: { type: String, default: "" },
  statusItem: { type: String, default: "Tersedia" },
});

module.exports = mongoose.model("Product", schema);
