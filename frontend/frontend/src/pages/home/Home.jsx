import React from 'react';
import "./home.css"
import Topbar from '../../components/Topbar/Topbar';
import Feed from '../../components/Feed/Feed';
import Sidebar from '../../components/Sidebar/Sidebar';
import Rightbar from '../../components/Rightbar/Rightbar';

const Home = () => {
  return (
      <>
         <Topbar />
         <div className="homeContainer">
            <Sidebar />
            <Feed />
            {/* <Rightbar /> */}
         </div>
      </>
  );
};

export default Home;