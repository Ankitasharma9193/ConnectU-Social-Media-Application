import React from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';
import Rightbar from '../../components/Rightbar/Rightbar';
import './profile.css';

const Profile = () => {
    return (
        <>
          <Topbar />
          <div className='profilePage'>
            <Sidebar />
            <div className="profileRight">
                <div className="profileRightTop">
                    <div className="profileCover">
                        <img
                            className="profileCoverImg"
                            src="assets/People/3.jpeg"
                            alt=""
                        />
                        <img 
                            className="profileUserImg"
                            src="assets/People/4.jpeg"
                        />
                    </div>

                    <div className="profileInfo">
                        <h4 className="profileInfoName">
                            Ankita
                        </h4>
                        <span className="profileInfoDesc">
                            Always a learner!
                        </span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed />
                    <Rightbar/>
                </div>
            </div>
            
          </div>
        </>
    );
};

export default Profile;