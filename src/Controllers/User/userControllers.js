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
            phone,
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
        if (process.env.USER_ID) {
            let distroySession = await tokenSchema.findOneAndDelete({ userID: process.env.USER_ID });
            console.log("with process.env.USER_ID");
            response(res, 200, {
                status: 200,
                result: distroySession
            })
        } else {
            let distroySession = await tokenSchema.findOneAndDelete({ token: process.env.token });
            console.log("with process.env.token");
            response(res, 200, {
                status: 200,
                result: distroySession
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


   





















/*********** Number Verification api  *************/
const numberVerification = async (req, res) => {
    try {
        process.env.verified = true; // first we need verifi the number by an OTP
        //  THEN it changes the verifiedNumber field to true 
        //   only then a scecific user will be able himself on the site.
        console.log("process.env.verified:", process.env.verified);
    } catch (error) {
        Response(res, 200, error.message);

    }
}
/*********** Number Verification api Ends  *************/





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
    numberVerification,
    dbEmpty,
    logOut
}