import "./CloseFriend.css";

const CloseFriend = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="closeFriend">
            <img className="closeFriendImg" src={ PF+user.profilePicture}/>
            <span className="closeFriendName">{ user.username }</span>
        </li>
    )
}

export default CloseFriend;