const mongoose = require("mongoose");

const { Schema } = mongoose;

const schema = new mongoose.Schema({
  nama: {
    type: String,
  },
  icon: 
    {
      type: String,
      
    },
  
});

module.exports = mongoose.model("Subkategori", schema);
