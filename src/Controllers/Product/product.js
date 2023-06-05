const response = require("../../utility/Response/response");


/*********** Login  *************/
const addProduct = async (req, res) => {
    try {
        console.log("addProduct");
        response(res, 200, {
            status: 200,
            result: "Adding Product"
        })
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** Login Ends  *************/

module.exports = {
    addProduct
}