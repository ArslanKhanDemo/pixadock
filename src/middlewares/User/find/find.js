
const userSchema = require("../../../models/userSchema/userSchema");
const response = require("../../../utility/Response/response");
const bcrypt = require("../../../utility/bcrypt/bcrypt");
const find = async (req,res,next)=>{
    try {
      
        let email = req.body.email;
        let password = req.body.password;
        let findUser = await userSchema.findOne({email});
        if (findUser) {
            let compare = await bcrypt.compare(password,findUser.password);
            compare ? next() : response(res,401,{
                status:401,
                error:"Un_Authorized Error"
            })
        } else {
            response(res,404,{
                status:404,
                result:"User Not Registered"
            });
        }


    } catch (error) {
        
    }
}

module.exports = find;