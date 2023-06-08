module.exports = (app)=>{
    app.use("/api",require("../Routes/AdminRoutes/adminRoutes"));
    app.use("/api",require("./CustomerRoutes/customerRoutes"));
    app.use("/api",require("../Routes/ProductRoutes/productRoutes"));
    app.use("/api",require("../Routes/GeneralRoutes/generalRoutes"));
}