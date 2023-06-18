const Joi = require("joi");
const response = require("../../../utility/Response/response");

const JoiAuth = (req, res, next) => {
    try {
        var value = Joi.object({
            contryCode: Joi.string().min(2).max(4).required(),
            phone: Joi.string().min(10).max(255).required(),
            firstName: Joi.string().min(2).max(255).required(),
            lastName: Joi.string().min(2).max(255).required(),
            userName: Joi.string().min(2).max(255).required(),
            email: Joi.string().email().required().messages({
                'string.email': 'Please enter a valid email address.',
                'any.required': 'Email is required.'
            }),
            password: Joi.string().regex(/^(?=.*[A-Z])/).regex(/^\S*$/).min(6).max(255).required().messages({
                'string.pattern.base': 'Password must contain no spaces, 6 character long and at least one uppercase letter.',
                'any.required': 'Password is required.'
            }),
            DOB: Joi.date().messages({
                'date.format': 'DOB must be in the format "YYYY-MM-DD".'
            }),
            termAndConditions: Joi.string().min(2).max(255).required(),
            privacyPolicy: Joi.string().min(2).max(255).required()
        });
        let result = value.validate(req.body);
        if (result.error) {
            console.log(result.error);
            return res.status(400).json({result: `${result.error}` });
        } else {
            console.log("Good to go from joi Middleware");
            next();
        }
    } catch (error) {
        response(res,500,{
            status:500,
            error:error.message
        })
    }
}
module.exports = JoiAuth;