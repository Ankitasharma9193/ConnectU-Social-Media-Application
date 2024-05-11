import "./rightbar.css";
import Online from "../Online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(false);

  useEffect(() => {
    const followInitial = currentUser.followings.includes(user?._id)
    setFollowed(followInitial)
  })

  useEffect(() => {
    const getUserFriend = async () => {
      try {
        const friendList = await axios.get("/users/friends/"+ user?._id)
        setFriends(friendList.data);
      } catch (err) {
        console.log('Error while fetching friends.....',err);
      }
    }
    getUserFriend();
  }, [user]);
  
  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id
      });
      dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log('Error while follow/unfollow', err);
    }
  };

  const HomeRightBar = () => {
    return (
      <div>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/Emojis/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <hr className="rightBarHr" />
        <div className='title'>
          <span className="titleText">Online </span>
        </div>
        {/* <ul className='friendListOnline'>
            {
              friends.map(friend => (
                <Online key={friend._id} friend={friend} />
                // <Online key={friend._id} friend={friend} />
              ))
            }
        </ul> */}
      </div>
    )
  };

  const ProfileRightBar = () => {
    return (
      <>
        { user.username !== currentUser.username && (
          <button className='rightBarFollowButton' onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )
        }
        <h4 className='titleText'> Information </h4>
        <div className='rightBarInfo'>
          <div className='infoItem'> 
            <span className='infoKey'>Current City: </span>
            <span className='infoItem'>{user?.city} </span>
          </div>

          <div className='infoItem'> 
            <span className='infoKey'>From: </span>
            <span className='infoItem'>{user?.from} </span>
          </div>

          <div className='infoItem'> 
            <span className='infoKey'>Birthday: </span>
            <span className='infoItem'>{user?.birth} </span>
          </div>
        </div>
        <h4 className='titleText'>User Friends</h4>
        <div className='profileBarFollowings'>
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend?.username}
              style={{ textDecoration: "none" }}
            > 
              <div className="profileBarFollowing">
                <img
                  className="profileBarFollowingImg"
                  src={
                    friend?.profilePicture
                      ? friend?.profilePicture
                      : PF + "person/1.png"
                  }
                  alt=""
                />
                <span className="profileBarFollowingName">{friend.username}</span>
              </div>
           </Link>
          ))}
        </div>
      </>
    )
  };

  return (
    <div className='rightBarApp'>
      <div className='rightbarAppContainer'>
        {
          user ? <ProfileRightBar /> : <HomeRightBar />
        }
      </div>
    </div>
  )
}

export default Rightbar;