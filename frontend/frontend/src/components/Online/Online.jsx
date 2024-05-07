import "./online.css";

const Online = ({ friend }) => {
    console.log('USER IN ONLINE:', friend)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <li className="onlineFriend">
            <div className="onlineFriendListContainer">
                <img className="onlineImg" src={PF+friend?.profilePicture} alt="" />
                <span className="online"></span>
            </div>
            <span className="onlineName">{friend?.username}</span>
        </li>
    )
}

export default Online;