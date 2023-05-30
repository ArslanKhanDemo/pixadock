const Response = require("../../utility/Response/response");

/*********** Registration  *************/
const registration = async (req, res) => {
    let result = {
        result: "Admin Registration is Working",
        Status: 200
    }
    Response(res, 200, result);
}
/*********** Registration - Ends *************/




/*********** Login  *************/
const Login = async (req, res) => {
    let result = {
        result: "Admin Login is Working",
        Status: 200
    }
    Response(res, 200, result);
}
/*********** Login Ends  *************/




module.exports = {
    registration,
    Login
}