const {signUp,login}  = require("../services/auth.services");
const {createCategory} = require("../services/category.service");
//controller for signup

async function signupHandler(req,res) {
    const {name,email,password , accountName , accountNumber} = req.body;
        console.log("signup details",name,email,password,accountName,accountNumber);

    if(!name || !email || !password || !accountName || !accountNumber)
    {
        throw new Error("Please fill all credentials!");
    }

    try {
        const user = await signUp({name,email,password , accountName , accountNumber});
        try {
      await createCategory(user.user.id);
    } catch (error) {
      console.log("error while creating categorise ",error.message);
    }
        res.status(201).json(user);
    } catch (error) {
        console.log("error is ",error.message);
        res.status(400).send("error occured while signup");
    }
}

async function loginHandler(req,res) {
    const {email,password} = req.body;
    if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const data = await login({email,password});
    //console.log(data.user.id);
    // console.log(req.userId);
    try {
      await createCategory(data.user.id);
    } catch (error) {
      console.log("error while creating categorise ",error.message);
    }
    res.status(200).json(data);
  } catch (error) {
    console.log("error is",error.message);
    res.status(401).send("Error occured while Login!");
  }
}

module.exports = {signupHandler,loginHandler};