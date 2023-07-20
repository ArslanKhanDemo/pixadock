
const userSchema = require("../../models/userSchema/userSchema");
const response = require("../../utility/Response/response");


const addUser = async (req, res) => {
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
            privacyPolicy,
            role
        } = req.body;


        let create = await userSchema.create({
            phone: "+" + contryCode + " " + phone,
            firstName,
            lastName,
            userName,
            email,
            password,
            DOB,
            termAndConditions,
            privacyPolicy,
            phoneVerified: false,
            role
        });
        let result = {
            result: create,
            Status: 200
        }
        response(res, 200, result);
    } catch (error) {
        response(res, 500, error.message);
    }
}
const updateUser = async (req, res) => {
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
            privacyPolicy,
            role
        } = req.body;

        //console.log("req.body:",req);
        let userUpdated = await userSchema.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true }
        );
        let result = {
            result: userUpdated,
            Status: 200
        }
        response(res, 200, result);
    } catch (error) {
        response(res, 500, error.message);
    }
}

module.exports = {
    addUser,
    updateUser
}