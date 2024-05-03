const router = require("express").Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

// UPDATE USER ACCOUNT
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.user.isAdmin){
        if(req.body.password){
            console.log('~~~~~',req.body.password)
            try{
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err) {
                return res.status(500).json('Error', err);
            }
        }
        try{
            const user = await UserModel.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only update your account");
    }
});

// DELETE USER ACCOUNT
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try {
            await UserModel.findByIdAndDelete()
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only delete your account");
    }
});

// GET USER ACCOUNT
router.get("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await UserModel.findById(req.params.id);
            const {password, updatedAt, ...other} = user._doc;
            res.status(200).json(user);
        } catch(err) {
            return res.status(500).json(err);
        }
    }
});

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        const userToFollow = req.params.id
        const userWantToFollow = req.body.userId
        try {
            const user = await UserModel.findById(userToFollow); // id of the account to follow
            const currentUser = await UserModel.findById(userWantToFollow) // user id
            if(!user.followers.includes(userWantToFollow)){
                await user.updateOne({$push: {followers: userWantToFollow} });
                await currentUser.updateOne({$push: {following: userToFollow} });
                res.status(200).json(`You are now following ${user?.username}`);
            } else {
                res.status(403).json("You already follow this user");
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cannot follow yourself")
    }
});

//UNFOLLOW USER
router.put(":id/unfollow", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        const userToFollow = req.params.id
        const userWantToFollow = req.body.userId
        try {
            const user = await UserModel.findById(userToFollow);
            const currentUser = await UserModel.findById(userWantToFollow);
            if(user.followers.includes(userWantToFollow)) {
                await user.updateOne({ $pull: {followers: userWantToFollow} })
                await currentUser.updateOne({ $pull: {following: userToFollow} })
                res.status(200).json(`You are no longer following ${user?.username}`);
            } else {
                res.status(403).json("You are not following this user");
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cannot unfollow yourself")
    }
});

module.exports = router;