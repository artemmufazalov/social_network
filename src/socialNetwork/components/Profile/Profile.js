import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostsContainer";



const ProfileContent = (props) => {
    return (
        <div className={s.profileClass}>

            <ProfileInfo/>

            <MyPostContainer store={props.store}/>

        </div>
    );
};

export default ProfileContent;