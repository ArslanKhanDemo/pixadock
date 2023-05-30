const Router = require("../../utility/Router");

const user_registration = require("../../Controllers/User/userControllers").user_registration;
Router.get("/registration",user_registration);

module.exports = Router;