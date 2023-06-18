module.exports = ()=>{
    // Generate a random number between 100000 and 999999
    const code = Math.floor(Math.random() * 900000) + 100000;
    process.env.VERIFICATION_CODE = code;
    return code;
  }