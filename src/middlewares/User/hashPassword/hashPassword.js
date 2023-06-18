const bcrypt = require("../../../utility/bcrypt/bcrypt");
const response = require("../../../utility/Response/response");
const SALT = process.env.SALT || 10;


const hashpassword = async (req, res, next) => {
    try {
        if (req.body.password) {
            console.log("Password: ",req.body.password);
            let salt = parseInt(SALT);
            //console.log(typeof salt);
            const hashpass = await bcrypt.hash(req.body.password, salt);
            //console.log("password:", req.body.password);
            req.body.password = hashpass;
            console.log("Good to go from bcrypt Middleware");
            next();
        } else {
            console.log("NoPassword");
            next();
        }
    } catch (error) {
        response(res, 500, {
            status: 500,
            result: error.message
        })
    }
}

module.exports = hashpassword;