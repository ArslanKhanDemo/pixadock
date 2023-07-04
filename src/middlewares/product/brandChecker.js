const brandSchema = require("../../models/brandSchema/brandSchema");
const response = require("../../utility/Response/response");


let brandChecker = async (req,res,next)=>{
try {
    let {brandName} = req.body;
    console.log("brandName:",req);
    brandName = brandName.toLowerCase();
    let foundBrand = await brandSchema.findOne({
        brandName
    }); 
    if (foundBrand) {
        response(res,201,"Brand already added");
    } else {
        next();
    }
} catch (error) {
    response(res,500,error.message);
}
}

module.exports = brandChecker;