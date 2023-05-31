const tokenSchema = require("../models/tokenSchema/tokenSchema");
const response = require("../utility/Response/response");



const authToken = async (req, res, next) => {
    try {

        let barrerToken = req.headers["authorization"];
        let token = barrerToken && barrerToken.split(" ")[1];

        if (token == null) {
            console.log("From Middleware");
            response(res, 404, {
                status: 404,
                result: "Authentication Error"
            });
        } else {
            let tokenFound = await tokenSchema({token});
            if (tokenFound.token === token) {
                console.log(tokenFound.token);
                console.log(token);
                process.env.token = token
                next();
            } else {
                response(res, 404, {
                    status: 404,
                    result: "Un_Authorize request"
                });
            }
        }

    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }

}
module.exports = authToken