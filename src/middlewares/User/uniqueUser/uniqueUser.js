const userSchema = require("../../../models/userSchema/userSchema");
const response = require("../../../utility/Response/response");

const uniqueUser = async (req,res,next)=>{
try {

    let email = req.body.email;
    let phone = req.body.phone;
    
    let findEmail = await userSchema.findOne({email});
    let findPhone = await userSchema.findOne({phone});
    
    if (findEmail || findPhone) {
        response(res,200,{
            status:200,
            result:"Email and Phone Number Already Registered"
        })
    } else {
        console.log("Good to go from UniqueUser Middleware");
        next();
    }
} catch (error) {
    response(res,500,{
        status:500,
        error:error.message
    });    
}
}

module.exports = uniqueUser;