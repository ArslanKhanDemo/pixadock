module.exports = (app)=>{
    app.use("/api",require("../Routes/AdminRoutes/adminRoutes"));
    app.use("/api",require("../Routes/UserRoutes/userRoutes"));
}