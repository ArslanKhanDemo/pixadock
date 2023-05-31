const db = require("../../db/mongoDB/mongodb");


let tokenSchema = new db.Schema({
  token: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  userID: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  role: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
});

module.exports = db.model("token", tokenSchema);