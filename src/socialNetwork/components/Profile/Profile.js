import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo";
import MyPostContainer from "./MyPosts/MyPostsContainer";


const Profile = (props) => {
    return (
        <div className={s.profileClass}>

            <ProfileInfo profile={props.profile}/>

            <MyPostContainer/>

        </div>
    );
};

export default Profile;