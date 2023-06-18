const cartSchema = require("../../models/cartSchema/cartSchema");
const userSchema = require("../../models/userSchema/userSchema");
const tokenSchema = require("../../models/tokenSchema/tokenSchema");
const response = require("../../utility/Response/response");
const bcrypt = require("../../utility/bcrypt/bcrypt");
const productSchema = require("../../models/productSchema/productSchema");
const db = require("../../db/mongoDB/mongodb");

/*********** Registration  *************/
const user_registration = async (req, res) => {
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
            role: "Customer"
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
        console.log("LoggedInn");
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



/*********** userDB EMPTY   *************/
const dbEmpty = async (req, res) => {
    try {
        let result = await productSchema.deleteMany();
        response(res, 200, result)
    } catch (error) {
        response(res, 200, error.message);
    }
}
/*********** userDB Ends  *************/











/*********** deleteAccount Strats  *************/
const deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        console.log("deleteAccount");
        let findUser = await userSchema.findById(process.env.USER_ID)
        let compare = await bcrypt.compare(password, findUser.password);
        if (compare) {
            let deletedAccount = await userSchema.findByIdAndDelete(process.env.USER_ID);
            let distroySession = await tokenSchema.findOneAndDelete({ token: process.env.token });
            if (deletedAccount && distroySession) {
                response(res, 200, {
                    status: 200,
                    result: deletedAccount
                })
            } else {
                response(res, 500, {
                    status: 500,
                    result: "Internal Error, Please try again after few mins. "
                })
            }
        } else {
            response(res, 404, {
                status: 404,
                result: "Please Provied a Correct Password"
            })
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** deleteAccount Ends  *************/






/*********** addToCart Strats  *************/
const addToCart = async (req, res) => {
    let productID = req.params.id;
    let p = productID.toString();
    let proceed = true;
    try {
        let productIDss = [];
        let currentCart = await cartSchema.findById(process.env.USER_ID);
        for (let index = 0; index < currentCart.productIDs.length; index++) {
            if (currentCart.productIDs[index] === p) {
                proceed = false
                response(res, 201, {
                    status: 201,
                    result: "The product is already added to your CART"
                });
                break;
            }
        }
        if (proceed) {
            productIDss = currentCart.productIDs;
            productIDss.push(productID);
            let updatedcart = await cartSchema.findByIdAndUpdate(process.env.USER_ID, {
                productIDs: productIDss
            }, { new: true });
            updatedcart ? response(res, 200, { status: 200, result: updatedcart }) : console.log("No record");
        }

    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** addToCart Ends  *************/





/*********** myCart Strats  *************/
const myCart = async (req, res) => {

    try {

        let cartValueObj = [];
        let price = 0;
        let findMyCart = await cartSchema.findById(process.env.USER_ID);
        if (findMyCart) {
            for (let index = 0; index < findMyCart.productIDs.length; index++) {
                let productPrice = await productSchema.findById(findMyCart.productIDs[index]);
                price = price + productPrice.price
                cartValueObj.push(productPrice);
            }
            response(res, 200, {
                status: 200,
                result: {
                    cartValueObj,
                    price
                }
            });
            process.env.CART_PRICE = price;
        } else {
            response(res, 404, {
                status: 404,
                result: "You Have An Empty Cart"
            });
        }


    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }
}
/*********** myCart Ends  *************/









/*********** DeleteAnItemFromCart Starts  *************/
const deleteItem = async (req, res) => {
    try {
        const arr = process.env.CART_ARRAY.split(',');
        let updatedcart = await cartSchema.findByIdAndUpdate(process.env.USER_ID, {
            productIDs: arr
        }, { new: true });
        updatedcart ? response(res, 200, { status: 200, result: updatedcart }) : console.log("No record");
        // response(res, 200, {
        //     status: 200,
        //     result: "deleteItem working "+req.params.id
        // });
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: "deleteItem catch error working"
        });
    }
}
/*********** DeleteAnItemFromCart Ends  *************/


















module.exports = {
    user_registration,
    Login,
    sendCode,
    dbEmpty,
    logOut,
    verification_Code_Submit,
    Update,
    deleteAccount,
    addToCart,
    myCart,
    deleteItem
}