const Response = require("../../utility/Response/response");
const userSchema = require("../../models/userSchema/userSchema");



/*********** Registration  *************/
const user_registration = async (req, res) => {
    try {
        const { 
            phone,
            firstName,
            lastName,
            userName,
            email,
            password,
            DOB,
            termAndConditions,
            privacyPolicy 
        } = req.body;
        //console.log(name);
        let create = await userSchema.create({
            phone,
            firstName,
            lastName,
            userName,
            email,
            password,
            DOB,
            termAndConditions,
            privacyPolicy,
            phoneVerified:false,
            role:"Customer"
        });
        let result = {
            result: create,
            Status: 200
        }
        Response(res, 200, result);
    } catch (error) {
        console.log({ error: error });
        Response(res, 500, {
            status: 500,
            message: error.message
        });
    }
}
/*********** Registration - Ends *************/








/*********** Login  *************/
const Login = async (req, res) => {
    let result = {
        result: "User Login is Working",
        Status: 200
    }
    Response(res, 200, result);
}
/*********** Login Ends  *************/




/*********** Number Verification api  *************/
const numberVerification = async (req, res) => {
    try {
        process.env.verified = true; // first we need verifi the number by an OTP
                                    //  THEN it changes the verifiedNumber field to true 
                                   //   only then a scecific user will be able himself on the site.
        console.log("process.env.verified:",process.env.verified);     
    } catch (error) {
        Response(res, 200, error.message);
        
    }
}
/*********** Login Ends  *************/


module.exports = {
    user_registration,
    Login,
    numberVerification
}