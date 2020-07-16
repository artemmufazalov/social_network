import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo";



const ProfileContent = (props) => {
    return (
        <div className={s.profileClass}>

            <ProfileInfo/>

            <MyPosts store={props.store}/>

        </div>
    );
};

export default ProfileContent;