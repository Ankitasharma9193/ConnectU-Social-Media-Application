import React, { useEffect, useState, useContext } from 'react';
import "./feed.css";
import Share from "../Share/Share";
import Post from "../Post/Post";
import axios from "axios"; 
import { AuthContext } from '../../context/AuthContext';

function Feed({ username }) {
  console.log('~ username', username);
  const [Posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const result = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("/posts/timeline/" + user._id)
      setPosts(
        // we need data sorted in chronological order, newest post at first
        result.data.sort((p1,p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      )
    };

    fetchPosts();
  }, [username, user._id]);

  console.log('all posts ~~~~~~~`',Posts);

  return (
    <div className='feed'>
        <div className='feedWrapper'>
            {(!username || username === user.username) && <Share /> }
            {
              Posts.map((post) => (
                <Post key={post._id} post={post} />
              ))
            }
        </div>
    </div>
  )
}

export default Feed;