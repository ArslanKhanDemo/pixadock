//const jwt = require("../../../utility/JsonWebToken/jsonWebToken");
let tokenSchema = require("../../../models/tokenSchema/tokenSchema");
let userSchema = require("../../../models/userSchema/userSchema");

const response = require("../../../utility/Response/response");

const session = async (req, res, next) => {

    try {
        //console.log("signToken:", signToken);
        let user = await userSchema.findOne({ email: req.body.email });
        let userToken = await tokenSchema.findOne({ userID: user._id });
        try {
            if (user) {
                let signToken = await require("../../../utility/JsonWebToken/jsonWebToken")(user.email);
                if (!userToken) {
                    let createToken = await tokenSchema.create({
                        token: signToken,
                        userID: user._id,
                        role: user.role
                    });
                    response(res, 201, {
                        status: 201,
                        result: createToken
                    })
                    process.env.USER_ID = user._id;
                    next();
                } else {
                    console.log("Already Looged Inn");
                    response(res,201,{
                        status:201,
                        result:userToken
                    })
                    process.env.USER_ID = user._id;
                    //console.log("process.env:",process.env);
                    next();
                }
            }else{
                response(res,404,{
                    status:404,
                    error: "Email Not Found"
                })
            }      
        } catch (error) {
            response(res,500,{
                status:500,
                error:error.message
            })
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            error: error.message
        })
    }

}

module.exports = session;