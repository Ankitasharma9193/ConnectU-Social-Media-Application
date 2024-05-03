const router = require("express").Router();
const Post = require("../models/Post");
const UserModel = require("../models/User");

// CREATE POST
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(200).json(err);
    }
});

// UPDATE POST
router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can only update your post")
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
    try {      
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res.status(200).json("the post has been deleted");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });

// LIKE/DISLIKE POST
router.put("/:id/like", async(req, res) => {
    try{
        const userWantToLikeDislike = req.body.userId;
        const post = await Post.findById(req.params.id);
        // if user has not liked post
        if(!post.likes.includes(userWantToLikeDislike)) {
            await post.updateOne({ $push: { likes: userWantToLikeDislike } });
            res.status(200).json("The post has been liked");
        } else { 
            // user disliked post
            await post.updateOne({ $pull: { likes: userWantToLikeDislike } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET POST
router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
});

//TIMELINE POSTS
router.get("/timeline/all", async(req, res) => {
    try {
        const currentUser = await UserModel.findById(req.body.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;