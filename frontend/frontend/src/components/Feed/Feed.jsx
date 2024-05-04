import React from 'react';
import "./feed.css";
import Share from "../Share/Share";
import Post from "../Post/Post";
import { Posts } from "../../dummyData"

function Feed() {
  return (
    <div className='feed'>
        <div className='feedWrapper'>
            <Share />
            {
              Posts.map((post) => (
                <Post key={post.id} post={post} />
              ))
            }
        </div>
    </div>
  )
}

export default Feed;