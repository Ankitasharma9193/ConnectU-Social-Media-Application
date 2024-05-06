import React, { useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Feed from '../../components/Feed/Feed';
import Rightbar from '../../components/Rightbar/Rightbar';
import './profile.css';
import axios from "axios";
import { useEffect } from 'react';
import { useParams } from "react-router";

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const { userName } = useParams()

    useEffect(() => {
        const fetchUser = async () => {
            console.log('~~~~~~~~~~>',userName)

            await axios('/users?username='+userName)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        };
        fetchUser();
    }, [userName]);

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
                            src={
                               user?.coverPicture
                                ? PF + user?.coverPicture
                                : PF + "person/4.png"
                            }
                            alt=""
                        />
                        <img 
                            className="profileUserImg"
                            src={
                              user?.profilePicture
                                ? PF + user?.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                        />
                    </div>

                    <div className="profileInfo">
                        <h4 className="profileInfoName">
                            {user?.username}
                        </h4>
                        <span className="profileInfoDesc">
                            {user?.desc}
                        </span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    {/* <Feed username={userName}/>
                    <Rightbar user={user} /> */}
                </div>
            </div>
            
          </div>
        </>
    );
};

export default Profile;