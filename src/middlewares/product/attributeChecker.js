const attributeSchema = require("../../models/attributeSchema/attributeSchema");
const response = require("../../utility/Response/response");


let attributeChecker = async (req,res,next)=>{
    let {attributeName,values} = req.body;
    console.log(values.length);
    if (values.length === 0) {
        response(res,404,"You must provide atleast one varient in it");
    } else {
        attributeName = attributeName.toLowerCase();
        req.body.attributeName = attributeName;
        let find = await attributeSchema.findOne({
            attributeName
        });
        if (find) {
            response(res,409,{
                status:409,
                "error": "Conflict",
                "message": "The attribute must be unique. Please provide a unique value."
              });
        } else {
            next();
        }
    }
}

module.exports = attributeChecker;