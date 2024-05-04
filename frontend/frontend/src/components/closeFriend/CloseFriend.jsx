import "./CloseFriend.css";

const CloseFriend = ({ user }) => {
    return (
        <li className="closeFriend">
            <img className="closeFriendImg" src={ user.profilePicture}/>
            <span className="closeFriendName">{ user.username }</span>
        </li>
    )
}

export default CloseFriend;