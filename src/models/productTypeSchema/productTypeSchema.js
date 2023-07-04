const db = require("../../db/mongoDB/mongodb");


let productTypeSchema = new db.Schema({
    productType: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  }
});

module.exports = db.model("productType", productTypeSchema);