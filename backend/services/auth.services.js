const prisma = require("../config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_Rounds = 10;

//creating a service for signup

async function signUp({name,email,password , accountName , accountNumber}) {
    // first checking that a user is already exists or not
    const existingUser = await prisma.user.findUnique({
        where :{email}
    });

    if(existingUser)
    {
        throw new Error("User Already exists please Login!");
    }
    const hashedPassword = await bcrypt.hash(password,SALT_Rounds);

    //now user didn't exists so creating a new row for a user's data
    const user = await prisma.user.create({
        data:{
           name : name,
           email : email,
           passwordHash: hashedPassword
        }
    });

const userData = await prisma.user.findUnique({
  where: { email },
  select: { id: true }
});

if (!userData) {
  throw new Error("User not found");
}

const userId = userData.id;

    const account = await prisma.account.create({
        data :{
            name : accountName,
            bankName : "Bank Of Maharashtra",
            balance : 0,
            userId : userId,
            accountNumber : accountNumber
        }
    });

   const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  //now existing users data returning to the routes

  return{
    token,
    user:{
        id : user.id,
        name : user.name,
        email : user.email
    }
  };
}

// now creating a Login Service

async function login({email,password}) {
    //getting users data
    const user = await prisma.user.findUnique({
        where:{email}
    });
    if(!user)
    {
        throw new Error("User didn't exists!");
    }
    // now validating password
    const isValidPassword = await bcrypt.compare(password,user.passwordHash);
    if (!isValidPassword) {
    throw new Error("Invalid credentials");
  }

  
  // Create JWT
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  //now existing users data returning to the routes

  return{
    token,
    user:{
        id : user.id,
        name : user.name,
        email : user.email
    }
  };
}

module.exports = {signUp,login};