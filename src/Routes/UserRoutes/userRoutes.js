const Router = require("../../utility/Router");
const JoiMiddleware = require("../../middlewares/joi/joi");
const hashpassword = require("../../middlewares/bcrypt/bcrypt");
const uniqueUser = require("../../middlewares/uniqueUser/uniqueUser");



/*********** Registration Route  *************/

const user_registration = require("../../Controllers/User/userControllers").user_registration;
Router.get("/user/registration",JoiMiddleware,hashpassword,uniqueUser,user_registration);



/*********** Login Route  *************/

const Login = require("../../Controllers/User/userControllers").Login;
Router.get("/user/login",Login);

/*********** Login Route  *************/

const numberVerified = require("../../Controllers/User/userControllers").numberVerification;
Router.get("/user/numberverified",numberVerified);


module.exports = Router;