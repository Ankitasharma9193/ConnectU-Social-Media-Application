import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
// import timeago from 'timeago.js';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  // console.log(post);
  const [like, setLike] = useState(post.likes.length)
  const [likeStatus, setLikeStatus] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user: currentUser } = useContext(AuthContext);
  // console.log('~~~~~~~~~~~~~~~~~~~`>in profile',currentUser)
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    setLikeStatus(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  
  const likeHandler = () => {
    try{
      axios.put("posts/"+post._id+ "/like", { userId: currentUser._id});
    } catch (err) {
      console.log(err)
    }
    likeStatus ? setLike(like - 1) : setLike(like + 1);
    setLikeStatus(!likeStatus);
  };

  return (
    <div className="post">
      <div className="postWrapper">

        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`} >
              <img  className='profileImg'
                src= {
                  currentUser.profilePicture
                    ? PF + currentUser.profilePicture
                    : PF + "person/1.jpeg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">
              {post?.username}
            </span>
            <span className='postDate'> {post.createdAt} </span>
          </div>
          <div className="postTopRight">
            <MoreVert/>
          </div>
        </div>

        <div className="postCentre">
          <span className='postCaption'> {post?.desc} </span>
          <img className='postImg' src= {PF+post?.photo} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
              <img className="likeIcon" src={`${PF}like.png`} onClick={ likeHandler } alt="" />
              <img className="likeIcon" src={`${PF}heart.png`} onClick={ likeHandler } alt="" />
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