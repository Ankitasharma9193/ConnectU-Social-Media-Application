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
            try{
                const res = await axios('/users?username='+userName)
                setUser(res.data)
            } catch(err) {
                    console.log(err)
                }
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
                            }
                            alt=""
                        />
                        <img 
                            className="profileUserImg"
                            src={
                              user?.profilePicture
                            }
                        />
                    </div>

                    <div className="profileInfo">
                        <h4 className="profileInfoName">
                            {user?.username?.toUpperCase()}
                        </h4>
                        <span className="profileInfoDesc">
                            {user?.desc}
                        </span>
                    </div>
                </div>
                <div className="profileRightBottom">
                    <Feed username={userName}/>
                    <Rightbar user={user} />
                </div>
            </div>
            
          </div>
        </>
    );
};

export default Profile;