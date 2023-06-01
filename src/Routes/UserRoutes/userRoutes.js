const Router = require("../../utility/Router");
const joi_Middleware = require("../../middlewares/User/joi/joi");
const hash_password = require("../../middlewares/User/bcrypt/bcrypt");
const unique_User = require("../../middlewares/User/uniqueUser/uniqueUser");
const find = require("../../middlewares/User/find/find");
const sessionCreation = require("../../middlewares/User/sessionCreation/sessionCreation");
const auth_Middleware = require("../../middlewares/authentication");







/*********** Registration Route  *************/

const user_registration = require("../../Controllers/User/userControllers").user_registration;
Router.post("/user/registration",joi_Middleware,hash_password,unique_User,user_registration);



/*********** Login Route  *************/

const Login = require("../../Controllers/User/userControllers").Login;
Router.get("/user/login",find,sessionCreation,Login);


/*********** LogOut Route  *************/

const logOut = require("../../Controllers/User/userControllers").logOut;
Router.delete("/user/logout",auth_Middleware,logOut);











/*********** numberVerification Route  *************/

const sendCode = require("../../Controllers/User/userControllers").sendCode;
Router.post("/user/sendcode",auth_Middleware,sendCode);





/*********** verification_Code_Submit Route  *************/

const verification_Code_Submit = require("../../Controllers/User/userControllers").verification_Code_Submit;
Router.post("/user/codesubmit",auth_Middleware,verification_Code_Submit);





/*********** dbEmpty Route  *************/

const dbEmpty = require("../../Controllers/User/userControllers").dbEmpty;
Router.delete("/user/dbempty",dbEmpty);


module.exports = Router;