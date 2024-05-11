const router = require("express").Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const { verify } = require("../jwtVerification");

// UPDATE USER ACCOUNT
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.user.isAdmin){
        if(req.body.password){
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
router.delete("/:id", verify, async (req, res) => {
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
router.get("/", async (req, res) => {
    // console.log('in req object',req)
    const userName = req.query.username;
    const userId = req.query.userId;
    try{
        const user = userId
         ? await UserModel.findById(userId)
         : await UserModel.findOne({ username: userName });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err)
    }
});



// GET ALL FRIENDS OF USER
router.get("/friends/:userId", async (req, res) => {
    try {
     if(req?.params?.userId !== "undefined"){
        const user = await UserModel.findById(req?.params?.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
            return UserModel.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
            });
            res.status(200).json(friendList)
     }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// FOLLOW USER
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id ){
        const userToFollow = req.params.id
        const userWantToFollow = req.body.userId
        try {
            const user = await UserModel.findById(userToFollow); // id of the account to follow
            const currentUser = await UserModel.findById(userWantToFollow) // user id
            if(!user.followers.includes(userWantToFollow)){
                await user.updateOne({$push: {followers: userWantToFollow} });
                await currentUser.updateOne({$push: {followings: userToFollow} });
                res.status(200).json(`You are now following ${user?.username}`);
            } else {
                console.log('i have issue')
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
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id) {
        const userToFollow = req.params.id
        const userWantToFollow = req.body.userId
        try {
            const user = await UserModel.findById(userToFollow);
            const currentUser = await UserModel.findById(userWantToFollow);
            if(user.followers.includes(userWantToFollow)) {
                await user.updateOne({ $pull: {followers: userWantToFollow} })
                await currentUser.updateOne({ $pull: {followings: userToFollow} })
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