const cartSchema = require("../../models/cartSchema/cartSchema");
const response = require("../../utility/Response/response");
response

const checkCart = async (req, res, next) => {
    try {
        let findCart = await cartSchema.findById(process.env.USER_ID);
       // console.log("findCart frm middleware:",findCart);
        if (findCart != null) {
            next();
        } else {
            let productID = req.params.id;
            //console.log("productID from checkCart: ",productID);
            let cart = await cartSchema.create({
                _id:process.env.USER_ID,
                productIDs: productID
            });
            response(res, 201, { status: 201, result: cart })
        }
    } catch (error) {
        response(res, 500, { status: 500, result: error })
    }
}

module.exports = checkCart;