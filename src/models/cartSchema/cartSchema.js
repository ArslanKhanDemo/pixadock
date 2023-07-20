const db = require("../../db/mongoDB/mongodb");

let cart = new db.Schema({
    _id:{
        type: String,
        required: true,
    },
    productIDs: {
        type: [String], // Array of strings
        required: true,
      },
});

module.exports = db.model("cart", cart);