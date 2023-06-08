const db = require("../../db/mongoDB/mongodb");

let blogs = new db.Schema({
    heading:{
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    image: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
      },
    content: {
        type: String, 
        minlength: 2,
        maxlength: 1000,
        required: true,
      },
});

module.exports = db.model("blog", blogs);