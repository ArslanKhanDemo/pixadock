const db = require("../../db/mongoDB/mongodb");


let productSchema = new db.Schema({
    category: {
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
  price: {
    type: Number,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  image: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  }
});

module.exports = db.model("product", productSchema);