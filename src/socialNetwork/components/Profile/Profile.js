import React from "react";
import s from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileProps from "./ProfileProps";
import ProfileInfo from "./ProfileInfo";



const ProfileContent = (props) => {
    return (
        <div className={s.profileClass}>

            <ProfileInfo/>

            <MyPosts postsData={props.postsData} dispatch={props.dispatch}/>

        </div>
    );
};

export default ProfileContent;