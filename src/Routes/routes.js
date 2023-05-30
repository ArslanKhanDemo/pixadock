module.exports = (app)=>{
    app.use("/api/user",require("../Routes/UserRoutes/userRoutes"));
}