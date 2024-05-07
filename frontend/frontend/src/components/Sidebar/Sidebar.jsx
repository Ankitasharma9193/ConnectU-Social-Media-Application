import React from 'react';
import "./sidebar.css";
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
} from '@mui/icons-material';
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";

function Sidebar() {
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='sidebar'>
        <div className="sidebarContainer">
            <ul className='sidebarList'>
                <li className='listItem'>
                    <RssFeed className='sidebarIcon' />
                    <span className='sidebarItemText'>Feed</span>
                </li>
                <li className='listItem'>
                    <Chat className='sidebarIcon' />
                    <span className='sidebarItemText'>Chats</span>
                </li>
                <li className="listItem">
                    <PlayCircleFilledOutlined className="sidebarIcon" />
                    <span className="sidebarListItemText">Videos</span>
                </li>
                <li className="listItem">
                    <Group className="sidebarIcon" />
                    <span className="sidebarListItemText">Groups</span>
                </li>
                <li className="listItem">
                    <Bookmark className="sidebarIcon" />
                    <span className="sidebarListItemText">Bookmarks</span>
                </li>
                <li className="listItem">
                    <HelpOutline className="sidebarIcon" />
                    <span className="sidebarListItemText">Questions</span>
                </li>
                <li className="listItem">
                    <WorkOutline className="sidebarIcon" />
                    <span className="sidebarListItemText">Jobs</span>
                </li>
                <li className="listItem">
                    <Event className="sidebarIcon" />
                    <span className="sidebarListItemText">Events</span>
                </li>
                <li className="listItem">
                    <School className="sidebarIcon" />
                    <span className="sidebarListItemText">Courses</span>
                </li>
            </ul>
            <button className='sidebarButton'>Show More</button>
            <hr className="sidebarHr" />
            {/* <ul className="sidebarFriendList">
            {
                Users.map((user) => (
                    <CloseFriend key={user.id} user={user} />
            ))}
            </ul> */}
        </div>
    </div>
  )
}

export default Sidebar;