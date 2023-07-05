const cartSchema = require("../../models/cartSchema/cartSchema");
const productSchema = require("../../models/productSchema/productSchema");
const response = require("../../utility/Response/response");

const checkCart = async (req, res, next) => {
    try {
        let id = req.params.id;
        console.log("qwewqqwer: ",typeof id);
        let findCart = await cartSchema.findById(process.env.USER_ID);
        console.log("a1");
        let findProduct = await productSchema.findOne({ _id:id });
        console.log("a2");
        console.log("findProduct: ",findProduct);
       // console.log("findCart frm middleware:",findCart);
       if (findProduct) {
           if (findCart != null) {
               next();
           } else {
               //console.log("productID from checkCart: ",productID);
               let cart = await cartSchema.create({
                   _id:process.env.USER_ID,
                   productIDs: [id]
               });
               response(res, 201, { status: 201, result: cart })
           }
       } else {
        response(res,404,"Product Not Found");
       }


    } catch (error) {
        response(res, 500, { status: 500, result: error.message })
    }
}

module.exports = checkCart;