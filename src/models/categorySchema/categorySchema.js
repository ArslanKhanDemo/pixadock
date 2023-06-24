const db = require("../../db/mongoDB/mongodb");

let categorySchema = new db.Schema({
    image: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    categoryName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    parent: {
        type: String,
        minlength: 2,
        maxlength: 255,
    },
});

module.exports = db.model("categorie", categorySchema);