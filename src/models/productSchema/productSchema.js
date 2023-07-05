const db = require("../../db/mongoDB/mongodb");


let productSchema = new db.Schema({
  category: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  brand: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  attributes: [{
    attribute: String,
    value: String,
  }],
  productDetail: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  image: {
    type: String,
    minlength: 2,
    maxlength: 255,
  },
  price: {
    type: Number,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  stock: {
    type: Number,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
});

module.exports = db.model("product", productSchema);