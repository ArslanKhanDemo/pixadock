const response = require("../../../utility/Response/response");


const authorizeUpdation = async (req, res,next) => {

    if (req.body._id ||
        req.body.email ||
        req.body.phoneVerified ||
        req.body.role) {
        response(res, 200, {
            status: 200,
            message: "Un_Authorizes Request"
        })
    }else{
        next();
    }

}

module.exports = authorizeUpdation;