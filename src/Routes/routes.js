module.exports = (app)=>{
    app.use("/api",require("../Routes/AdminRoutes/adminRoutes"));
    app.use("/api",require("../Routes/UserRoutes/userRoutes"));
    app.use("/api",require("../Routes/ProductRoutes/productRoutes"));
}