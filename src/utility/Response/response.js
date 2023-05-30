module.exports = (res,status,result)=>{
    res.status(status).json({result:result});
}