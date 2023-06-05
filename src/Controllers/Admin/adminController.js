const userSchema = require("../../models/userSchema/userSchema");
const tokenSchema = require("../../models/tokenSchema/tokenSchema");
const productSchema = require("../../models/productSchema/productSchema");

const response = require("../../utility/Response/response");
const bcrypt = require("../../utility/bcrypt/bcrypt");

/*********** Registration Starts *************/
const registration = async (req, res) => {
    try {
        const {
            contryCode,
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
            phone: "+" + contryCode + phone,
            firstName,
            lastName,
            userName,
            email,
            password,
            DOB,
            termAndConditions,
            privacyPolicy,
            phoneVerified: false,
            role: "Admin"
        });
        let result = {
            result: create,
            Status: 200
        }
        response(res, 200, result);
    } catch (error) {
        console.log({ error: error });
        response(res, 500, {
            status: 500,
            message: error.message
        });
    }

}
/*********** Registration - Ends *************/





/*********** Login  *************/
const Login = async (req, res) => {
    try {
        console.log("Admin LoggedInn");

    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** Login Ends  *************/

/*********** Update Starts  *************/
const Update = async (req, res) => {
    try {
        try {
            let updatedRecord = await userSchema.findOneAndUpdate(
                { _id: process.env.USER_ID },
                req.body,
                { new: true }
            );
            response(res, 201, updatedRecord);
        } catch (error) {
            console.log(error.message);
            response(res, 500, error.message);
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** Update Ends  *************/



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
                State: "Logged Out Successfully"
            })
        } else {
            // if system cutoff or changes its state / codeChange.
            let distroySession = await tokenSchema.findOneAndDelete({ token: process.env.token });
            console.log("with process.env.token / if system cutoff or changes its state / codeChange.");
            response(res, 200, {
                status: 200,
                result: distroySession.userID,
                State: "Logged Out Successfully"
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
        console.log("UserPhone:", userPhone);
        let twilio = require('../../utility/twilio/twilio');
        const CODE = require("../../utility/verificationCodeGenerator/codeGenerator")();
        console.log(CODE);
        twilio(req, res, userPhone, CODE);
    } catch (error) {
        response(res, 500, error.message);
    }
}
/*********** sendCode api Ends *************/


/*********** verification_Code_Submit api Start  *************/

const verification_Code_Submit = async (req, res) => {
    try {
        let { code } = req.body;
        let verifier = require("../../helper/twilioVerifier/twilioVerifier");
        let result = verifier(code);
        console.log(result);
        if (result) {
            let verified = await userSchema.findByIdAndUpdate(process.env.USER_ID, {
                phoneVerified: true
            }, { new: true });
            if (verified) {
                response(res, 200, {
                    status: 200,
                    result: verified,
                })
            } else {
                response(res, 204, {
                    status: 204,
                    result: "Not Found",
                })
            }
        }
        //console.log(result);
        else {
            response(res, 200, {
                status: 200,
                result: "Wrong Code, Not Verified",
            });
        }
        //res.end();

    } catch (error) {
        response(res, 500, error.message);
    }
}

/*********** verification_Code_Submit Ends  *************/

















/*********** addProduct api Start *************/
const addProduct = async (req, res) => {
    try {

        const { category, name, price } = req.body;
        //console.log("IMAGE;", req.files);
        let productCreated = await productSchema.create({
            category: category,
             name: name, 
             price: price, 
             image: req.files[0].filename,
        });
        if (productCreated) {
            response(res, 201, {
                status: 201,
                result: productCreated
            })
        } else {
            response(res, 500, {
                status: 500,
                result: "Internal Error"
            });
        }
    } catch (error) {
        response(res, 420, {
            status: 420,
            Error: error.message
        });
    }
}
/*********** addProduct api Ends *************/









module.exports = {
    registration,
    Login,
    Update,
    logOut,
    sendCode,
    verification_Code_Submit,
    addProduct
}