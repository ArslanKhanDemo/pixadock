const Joi = require("joi");

const JoiAuth = (req, res, next) => {
    var value = Joi.object({
        phone: Joi.string().min(10).max(255).required(),
        firstName: Joi.string().min(2).max(255).required(),
        lastName: Joi.string().min(2).max(255).required(),
        userName: Joi.string().min(2).max(255).required(),
        email: Joi.string().email().required().messages({
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.'
        }),
        password: Joi.string().regex(/^(?=.*[A-Z])/).regex(/^\S*$/).required().messages({
            'string.pattern.base': 'Password must contain no spaces and at least one uppercase letter.',
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
        return res.status(400).json({ "Bad Request:": `${result.error}` });
    }else{
        console.log("Good to go from joi Middleware");
        next();
    }
}
module.exports = JoiAuth;