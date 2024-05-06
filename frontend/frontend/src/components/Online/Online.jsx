import "./online.css";

const Online = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="onlineFriend">
            <div className="onlineFriendListContainer">
                <img className="onlineImg" src={PF+user.profilePicture} alt="" />
                <span className="online"></span>
            </div>
            <span className="onlineName">{user.username}</span>
        </li>
    )
}

export default Online;