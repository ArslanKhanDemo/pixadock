
const userSchema = require("../../../models/userSchema/userSchema");
const response = require("../../../utility/Response/response");
const bcrypt = require("../../../utility/bcrypt/bcrypt");
const find = async (req,res,next)=>{
    try {
      
        let email = req.body.email;
        let password = req.body.password;
       // console.log(req.body);
        let findUser = await userSchema.findOne({email});
        if (findUser) {
            let compare = await bcrypt.compare(password,findUser.password);
            compare ? next() : response(res,401,{
                status:401,
                error:"Email or Password not correct"
            })
        } else {
            response(res,404,{
                status:404,
                result:"User Not Registered"
            });
        }


    } catch (error) {
        response(res,500,{
            status:500,
            result:error.message
        });
    }
}

module.exports = find;