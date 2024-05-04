import React from 'react';
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../Online/Online";

function Rightbar() {
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
      <ul className='friendListOnline'>
          {Users.map((user) => (
            <Online user= {user}/>
          ))}
      </ul>
    </div>
  )
}

export default Rightbar;