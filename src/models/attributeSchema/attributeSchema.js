const db = require("../../db/mongoDB/mongodb");

let attributeSchema = new db.Schema({
    attributeName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    values: {
        type: Array,
        minlength: 1,
        maxlength: 255,
        required: true,
    },
    slug: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true,
    },
    
});

module.exports = db.model("attribute", attributeSchema);