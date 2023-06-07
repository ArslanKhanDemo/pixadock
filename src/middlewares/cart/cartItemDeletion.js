const cartSchema = require("../../models/cartSchema/cartSchema");
const response = require("../../utility/Response/response");


const deleteItem = async (req,res,next)=>{
    try {
    let id = req.params.id;
    let cart = await cartSchema.findById(process.env.USER_ID);
    let cartArray = cart.productIDs;
    for (let index = 0; index < cartArray.length; index++) {
        if (cartArray[index] == id) {
            console.log(cartArray[index]);
            cartArray.pop(cartArray[index]);
            
            process.env.CART_ARRAY = cartArray;
            break;
        }
    }
    next();

} catch (error) {
    response(res,500,{
        status:200,
        result:error.message
    })
}
}

module.exports = deleteItem;