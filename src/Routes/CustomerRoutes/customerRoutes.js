const Router = require("../../utility/Router");



const joi_Middleware = require("../../middlewares/User/joi/joi");
const hash_password = require("../../middlewares/User/hashPassword/hashPassword");
const unique_User = require("../../middlewares/User/uniqueUser/uniqueUser");
const find = require("../../middlewares/User/find/find");
const sessionCreation = require("../../middlewares/sessionCreation/sessionCreation");
const auth_Middleware = require("../../middlewares/authentication");
const authorizeUpdation = require("../../middlewares/User/authorizeUpdation/authorizeUpdation");
const checkCart = require("../../middlewares/checkCart/checkCart");
const cartItemDeletion = require("../../middlewares/cart/cartItemDeletion");






/*********** Registration Route  *************/

const user_registration = require("../../Controllers/Customer/customerControllers").user_registration;
Router.post("/user/registration",joi_Middleware,hash_password,unique_User,user_registration);


/*********** Login Route  *************/

const Login = require("../../Controllers/Customer/customerControllers").Login;
Router.get("/user/login",find,sessionCreation,Login);


/*********** Update Route  *************/

const Update = require("../../Controllers/Customer/customerControllers").Update;
Router.patch("/user/update",auth_Middleware,authorizeUpdation,hash_password,Update);

/*********** deleteAccount Route  *************/

const deleteAccount = require("../../Controllers/Customer/customerControllers").deleteAccount;
Router.delete("/user/deleteaccount",auth_Middleware,deleteAccount);



/*********** LogOut Route  *************/

const logOut = require("../../Controllers/Customer/customerControllers").logOut;
Router.delete("/user/logout",auth_Middleware,logOut);















/*********** numberVerification Route  *************/

const sendCode = require("../../Controllers/Customer/customerControllers").sendCode;
Router.post("/user/sendcode",auth_Middleware,sendCode);





/*********** verification_Code_Submit Route  *************/

const verification_Code_Submit = require("../../Controllers/Customer/customerControllers").verification_Code_Submit;
Router.post("/user/codesubmit",auth_Middleware,verification_Code_Submit);





/*********** dbEmpty Route  *************/

const dbEmpty = require("../../Controllers/Customer/customerControllers").dbEmpty;
Router.delete("/user/dbempty",dbEmpty);



/*********** addToCart Route  *************/

const addToCart = require("../../Controllers/Customer/customerControllers").addToCart;
Router.post("/user/addtocart/:id",auth_Middleware,checkCart,addToCart);

/*********** myCart Route  *************/

const myCart = require("../../Controllers/Customer/customerControllers").myCart;
Router.get("/user/mycart",auth_Middleware,myCart);



/*********** deleteItem Route  *************/

const deleteItem = require("../../Controllers/Customer/customerControllers").deleteItem;
Router.delete("/user/deleteitem/:id",auth_Middleware,cartItemDeletion,deleteItem);


module.exports = Router;