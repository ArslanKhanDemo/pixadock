const tokenSchema = require("../../models/tokenSchema/tokenSchema");
const response = require("../../utility/Response/response");



const verifyAdmin = async (req, res, next) => {
    try {
        let token = await tokenSchema.findOne({ token: process.env.token });
        if (token.role === "Admin") {
            next();
        } else {
            response(res, 200, {
                status: 200,
                result: "UnAuthorized Request"
            })
        }

    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        });
    }
}

module.exports = verifyAdmin;