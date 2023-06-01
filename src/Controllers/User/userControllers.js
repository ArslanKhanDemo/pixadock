const Response = require("../../utility/Response/response");
const userSchema = require("../../models/userSchema/userSchema");
const tokenSchema = require("../../models/tokenSchema/tokenSchema");
const response = require("../../utility/Response/response");


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


        let create = await userSchema.create({
            phone:"+92"+phone,
            firstName,
            lastName,
            userName,
            email,
            password,
            DOB,
            termAndConditions,
            privacyPolicy,
            phoneVerified: false,
            role: "Customer"
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
    try {
        console.log("LoggedInn");
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** Login Ends  *************/






/*********** LoginOut  *************/
const logOut = async (req, res) => {
    try {
        console.log();
        if (process.env.USER_ID) { // if system continues without any cutoff
            let distroySession = await tokenSchema.findOneAndDelete({ userID: process.env.USER_ID });
            console.log("with process.env.USER_ID / if system continues without any cutoff");
            response(res, 200, {
                status: 200,
                result: distroySession.userID,
                State:"Logged Out Successfully"
            })
        } else {
            // if system cutoff or changes its state / codeChange.
            let distroySession = await tokenSchema.findOneAndDelete({ token: process.env.token });
            console.log("with process.env.token / if system cutoff or changes its state / codeChange.");
            response(res, 200, {
                status: 200,
                result: distroySession.userID,
                State:"Logged Out Successfully"
            })
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** LoginOut Ends  *************/
























/*********** sendCode api Start *************/
const sendCode = async (req, res) => {
    try {
        let userPhone = process.env.PHONE;
        console.log("UserPhone:",userPhone);
        let twilio = require('../../utility/twilio/twilio');
        const CODE = require("../../utility/verificationCodeGenerator/codeGenerator")();
        console.log(CODE);
        twilio(req, res,userPhone, CODE);
    } catch (error) {
        Response(res, 500, error.message);
    }
}
/*********** sendCode api Ends *************/






/*********** verification_Code_Submit api Start  *************/

const verification_Code_Submit = async (req, res) => {
    try {
        let {code} = req.body;
        let verifier =  require("../../helper/twilioVerifier/twilioVerifier");
        let result = verifier(code);
        console.log(result);
        if (result) {
            let verified = await userSchema.findByIdAndUpdate(process.env.USER_ID,{
                phoneVerified:true
            },{new:true});
            if (verified) {
                response(res,200,{
                    status: 200,
                result:verified,
            })
        } else {
            response(res,204,{
                status: 204,
                result:"Not Found",
            })
        }
    } 
    //console.log(result);
    else {
            response(res,200,{
                status: 200,
                result:"Wrong Code, Not Verified",
           });
        }
        //res.end();
        
    } catch (error) {
        Response(res, 500, error.message);
    }
}

/*********** erification_Code_Submit Ends  *************/












/*********** userDB EMPTY   *************/
const dbEmpty = async (req, res) => {
    try {
        let result = await userSchema.deleteMany();
        Response(res, 200, result)
    } catch (error) {
        Response(res, 200, error.message);
    }
}
/*********** userDB Ends  *************/





module.exports = {
    user_registration,
    Login,
    sendCode,
    dbEmpty,
    logOut,
    verification_Code_Submit
}