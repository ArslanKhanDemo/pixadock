const db = require("../../db/mongoDB/mongodb");

let brandSchema = new db.Schema({
    brandName:{
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    image:{
        type: String,
        minlength: 2,
        maxlength: 255,
    }
});

module.exports = db.model("brand", brandSchema);