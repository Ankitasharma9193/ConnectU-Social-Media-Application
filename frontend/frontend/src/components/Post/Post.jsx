import "./post.css";
import { MoreVert } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from 'javascript-time-ago';
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import en from 'javascript-time-ago/locale/en';
import { HEART_URL, LIKE_URL } from '../../constants';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length)
  const [likeStatus, setLikeStatus] = useState(false);
  const [user, setUser] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  
  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo('en-US');
  // current user (primary/profile owner)
  const { user: currentUser } = useContext(AuthContext);
  // fetch user data of each user in the post array
  useEffect(() => {
    const fetchUser = async () => {
      const result = await axios.get( '/users?userId='+post?.userId);
      setUser(result?.data);
    };
    fetchUser();
  }, [post?.userId]);

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
            <Link to={`profile/${user?.username}`} >
              <img  className='profileImg'
                src= {
                    user?.profilePicture
                    ? user?.profilePicture
                    : PF + "person/1.jpeg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user?.username}
            </span>
            <span className='postDate'> {timeAgo.format(new Date(post?.createdAt))} </span>
          </div>
          <div className="postTopRight">
            <MoreVert/>
          </div>
        </div>

        <div className="postCentre">
          <span className='postCaption'> {post?.desc} </span>
          <img className='postImg' src= {post?.img} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
              <img className="likeIcon" src={LIKE_URL} onClick={ likeHandler } alt="" />
              <img className="likeIcon" src={HEART_URL} onClick={ likeHandler } alt="" />
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