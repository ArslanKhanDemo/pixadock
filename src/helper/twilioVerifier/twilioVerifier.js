


const verifier = (code)=>{
    console.log("process.env.VERIFICATION_CODE:",typeof process.env.VERIFICATION_CODE," "+process.env.VERIFICATION_CODE);
    console.log("code:",typeof code," "+code);
    if(process.env.VERIFICATION_CODE === code){
        process.env.VERIFICATION_CODE = null
        return true;
    }else{
        process.env.VERIFICATION_CODE = null
        return false
    }
}

module.exports = verifier;