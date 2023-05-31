const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET || "secret_key";
//const Response = require("../utility/res");





module.exports = async (email)=>{
    try {
        let sign = await jwt.sign(email,secret_key);
        console.log("Good to go from jwt MIDDLEWARE",sign);
        return sign;
    } catch (error) {
        throw error;
    }
}