import "./online.css";

const Online = ({ user }) => {
    return (
        <li className="onlineFriend">
            <div className="onlineFriendListContainer">
                <img className="onlineImg" src={user.profilePicture} alt="" />
                <span className="online"></span>
            </div>
            <span className="onlineName">{user.username}</span>
        </li>
    )
}

export default Online;