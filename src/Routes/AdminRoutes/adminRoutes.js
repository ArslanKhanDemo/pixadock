const Router = require("../../utility/Router");


const joi_Middleware = require("../../middlewares/User/joi/joi");
const hash_password = require("../../middlewares/User/hashPassword/hashPassword");
const unique_User = require("../../middlewares/User/uniqueUser/uniqueUser");
const find = require("../../middlewares/User/find/find");
const sessionCreation = require("../../middlewares/sessionCreation/sessionCreation");
const auth_Middleware = require("../../middlewares/authentication");
const authorizeUpdation = require("../../middlewares/User/authorizeUpdation/authorizeUpdation");
const verifyAdmin = require("../../middlewares/Admin/verifyAdmin");
const multerMiddleware = require("../../middlewares/Multer/multer");






/*********** Registration Route *************/
const registration = require("../../Controllers/Admin/adminController").registration;
Router.post("/admin/registration",joi_Middleware,hash_password,unique_User,registration);


/*********** Login Route *************/
const Login = require("../../Controllers/Admin/adminController").Login;
Router.get("/admin/login",find,sessionCreation,Login);

/*********** Update Route  *************/

const Update = require("../../Controllers/Admin/adminController").Update;
Router.patch("/admin/update",auth_Middleware,authorizeUpdation,hash_password,Update)


/*********** LogOut Route  *************/

const logOut = require("../../Controllers/Admin/adminController").logOut;
Router.delete("/admin/logout",auth_Middleware,logOut);



/*********** numberVerification Route  *************/

const sendCode = require("../../Controllers/Admin/adminController").sendCode;
Router.post("/admin/sendcode",auth_Middleware,sendCode);



/*********** verification_Code_Submit Route  *************/

const verification_Code_Submit = require("../../Controllers/Admin/adminController").verification_Code_Submit;
Router.post("/admin/codesubmit",auth_Middleware,verification_Code_Submit);



/*********** Add Product Route  *************/

const addProduct = require("../../Controllers/Admin/adminController").addProduct;
Router.post("/admin/addproduct",auth_Middleware,verifyAdmin,multerMiddleware.any(),addProduct);






    

module.exports = Router;