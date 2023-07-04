const response = require("../../utility/Response/response");

const productTypeChecker = (req,res,next)=>{
    try {
        if (req.body.productType === "") {
            response(res,405,{
                status:405,
                message:"The ProductType can't be empty"
            });
        } else {
            next();
        }
    } catch (error) {
        response(res,500,{
            status:500,
            error: error.message
        })
    }
};

module.exports = productTypeChecker;