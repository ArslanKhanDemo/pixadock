const db = require("../../db/mongoDB/mongodb");

let productReviewSchema = new db.Schema({
    productID: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    rating: {
        type: Number,
        validate: {
          validator: function(value) {
            // Custom validation logic
            // Return true if valid, false otherwise
            return value <=5 && value >=0;
          },
          message: 'rating should be in the range of 0 - 5'
        }
      },
    userName: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    email: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    review: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true,
    },
    approved: {
        type: Boolean,
        required: true,
    }
});

module.exports = db.model("productReview", productReviewSchema);