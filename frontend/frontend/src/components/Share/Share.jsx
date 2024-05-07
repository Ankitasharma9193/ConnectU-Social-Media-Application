import React from 'react';
import "./share.css";
import { PermMedia, 
    Label,
    Room, 
    EmojiEmotions,
    Cancel
} from '@mui/icons-material';
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
 const { user } = useContext(AuthContext);
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 const desc = useRef();
 const [file, setFile] = useState(null);

 const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    // if there is file/image uploaded
    if(file){
        const data = new FormData();
        // we need file name to be date + name to keep it unique
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        // append file to data
        data.append("file", file);
        // upload image to post
        newPost.img = fileName
        console.log('newPost:', newPost);
        // upload file to server
        try{
            await axios.post("/upload", data);
        } catch (err) {
            console.log('Error while uploading....',err)
        }
    }
    // post description/thought to server
    try{
        await axios.post("/posts", newPost);
        // refresh the page after uploading post
        window.location.reload();
    } catch (err) {
        console.log('Error while sharing thought....',err)
    }
 }

  return (
    <div className='share'>
        <div className='shareContainer'>
            <div className='shareTop'>
                <img className='shareProfileImage'
                 src= {
                    user.profilePicture
                     ? PF + user.profilePicture
                     : PF + "person/1.jpeg"
                 }
                 alt='' 
                />
                <input 
                    placeholder='Share your thoughts...'
                    className='shareInput'
                    ref = {desc}
                />
            </div>
            <hr className="shareHr"/>
            {file && (
                <div className="shareImgContainer">
                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                </div>
            )}
            <form className='shareBottom' onSubmit={ submitHandler }>
                <div className='shareOptions'>
                    <label htmlFor="file" className='shareOption'>
                        <PermMedia htmlColor="tomato" className="shareIcon" />
                        <span className="shareOptionText">Photo or Video</span>
                        <input 
                            style={{ display: "none" }}
                            type="file"
                            id="file"
                            accept=".png,.jpeg,.jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </label>
                    <div className="shareOption">
                        <Label htmlColor="blue" className="shareIcon"/>
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room htmlColor="green" className="shareIcon"/>
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <div>
                    <button className="shareButton" 
                        type="submit">
                            Share
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}