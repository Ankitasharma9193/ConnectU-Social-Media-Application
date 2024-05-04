import React from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const ProfilePage = () => {
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
                            src="assets/post/3.jpeg"
                            alt=""
                        />
                        <img 
                            className="profileUserImg"
                            src="assets/person/4.jpeg"
                        />
                    </div>

                    <div className="profileInfo">
                        <h4 className="profileInfo">
                            John
                        </h4>
                        <span className="profileInfoDesc">
                            Hello my friends!
                        </span>
                    </div>
                </div>
            </div>
          </div>
        </>
    );
};

export default ProfilePage;