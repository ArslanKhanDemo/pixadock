const userSchema = require("../../../models/userSchema/userSchema");
const response = require("../../../utility/Response/response");

const uniqueUser = async (req,res,next)=>{
try {

    let email = req.body.email;
    let phone = req.body.phone;
    let contryCode = req.body.contryCode;
    
    console.log("+" + contryCode + " " +phone);

    let findEmail = await userSchema.findOne({email});
    let findPhone = await userSchema.findOne({phone:"+"+contryCode+" "+phone});
    console.log("findEmail: ",findEmail === null);
    let value = 0;
    if (findEmail !== null) {
        value = "Email"
    }
    if(findPhone !== null){
        value = "Phone Number"
    }
    if(findEmail && findPhone){
        value = "Email And Phone Number"
    }
    if (findEmail || findPhone) {
        response(res,409,{
            status:409,
            error:`${value} Already Registered`
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