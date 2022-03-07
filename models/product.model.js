const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  userId:{
    type:mongoose.SchemaTypes.ObjectId,
    ref:'user',
    required:true
  }
});

const product = mongoose.model("product", productSchema);

module.exports = product;