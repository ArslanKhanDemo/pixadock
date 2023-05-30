const Router = require("../../utility/Router");



/*********** Registration Route *************/
const registration = require("../../Controllers/Admin/adminController").registration;
Router.get("/admin/registration",registration);


/*********** Login Route *************/
const Login = require("../../Controllers/Admin/adminController").Login;
Router.get("/admin/login",Login);




module.exports = Router;