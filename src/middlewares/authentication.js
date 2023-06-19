const tokenSchema = require("../models/tokenSchema/tokenSchema");
const userSchema = require("../models/userSchema/userSchema");
const response = require("../utility/Response/response");



const authToken = async (req, res, next) => {
    try {


        console.log("req.body from initial admin",req.body);

        console.log("From authentication Middleware start");
        let barrerToken = req.headers["authorization"];
        let token = barrerToken && barrerToken.split(" ")[1];
        //token != null ? console.log("tokenzzzz:",token):console.log("Token Is Null");
        
        if (token == null) {
            //console.log("The Token Is NULL");
            response(res, 401, {
                status: 401,
                result: "No Token"
            });
        } else {
            //console.log("inside token:",token);
            let tokenFound = await tokenSchema.findOne({token:token});
            if (tokenFound) {
                if (tokenFound.token === token) {
                    // console.log("Token Found:",tokenFound.token);
                    // console.log("Token Entered:",token);
                    process.env.token = token
                    console.log("From authentication Middleware Ends");
                    next();
                } else {
                    response(res, 402, {
                        status: 402,
                        result: "Un_Authorize request"
                    });
                }
            } else {
                response(res, 403, {
                    status: 403,
                    result: "Please Login To Gain Access"
            })}
        }

    } catch (error) {
        console.log(error);
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }

}
module.exports = authToken