const router = require("express").Router();
const UserModel = require("../models/User")
const bcrypt = require("bcrypt")

// USER REGISTRATION
router.post("/register", async (req, res)=> {
  try{
    // generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    //create a new user
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    
    //save user and respond
    const userSaved = await newUser.save();
    res.status(200).json(userSaved);

  } catch(err){
     res.status(500).json(err);
  }
});

// USER LOGIN
router.post("/login", async(req, res) => {
    try{
        const user = await UserModel.findOne({email: req.body.email});
        //check if user exists
        !user && res.status(404).json("user not found");
        //decrypt and compare password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        //check if password is valid
        //!validPassword && res.status(400).json("wrong password");
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;