const db = require("../../db/mongoDB/mongodb");
let userSchema = new db.Schema({
  phone: {
    type: String,
    minlength: 10,
    maxlength: 255,
    required: true,
  },
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  userName: {
    type: String,
    minlength: 2,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    minlength: 7,
    maxlength: 255,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
  },
  DOB: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  address: {
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
  },
  termAndConditions: {
    type: String,
  },
  privacyPolicy: {
    type: String,
  },
  phoneVerified: {
    type: Boolean,
  },
  role:{
    type:String,
    enum:["Customer","Admin","Editor"],
    required:true
  }
});


module.exports = db.model("User", userSchema);