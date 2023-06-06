const response = require("../../utility/Response/response");
const productReviewSchema = require("../../models/productReviewSchema/productReviewSchema");

/*********** get approved Reviews start  *************/
const approvedReviews = async (req, res) => {
    try {
        let result = await productReviewSchema.find({productID:req.params.id,approved:true});
        response(res, 200, {
            status: 200,
            result: result
        })
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** get approved Reviews Ends  *************/

module.exports = {
    approvedReviews
}