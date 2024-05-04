import React, { useState } from 'react';
import './post.css';
import { MoreVert } from '@mui/icons-material';
import { Users } from "../../dummyData";

export default function Post({ post }) {
  const [like, setLike] = useState(post.like)
  const [likeStatus, setLikeStatus] = useState(false);
  
  const likeHandler = () => {
    likeStatus ? setLike(like - 1) : setLike(like + 1);
    setLikeStatus(!likeStatus);
  };

  return (
    <div className="post">
      <div className="postWrapper">

        <div className="postTop">
          <div className="postTopLeft">
            <img  className='profileImg'
              src= {
                Users.filter((user) => 
                user.id === post?.userId
                )[0].profilePicture
              }
            />
            <span className="postUsername">
              {
                Users.filter((user) => 
                user.id === post?.userId
                )[0].username
              }
            </span>
            <span className='postDate'> {post?.date} </span>
          </div>
          <div className="postTopRight">
            <MoreVert/>
          </div>
        </div>

        <div className="postCentre">
          <span className='postCaption'> {post?.desc} </span>
          <img className='postImg' src= {post?.photo} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
              <img className="likeIcon" src="assets/Emojis/like.png" onClick={ likeHandler } alt="" />
              <img className="likeIcon" src="assets/Emojis/heart.png" onClick={ likeHandler } alt="" />
              <span className="likeCount"> {like} people like it</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText"> {post?.comment} comments </span>
            </div>
          </div>
        </div>
    </div>
  )
}