import React from "react";
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./MyPosts/MyPosts";


const Profile = (props) => {

    return (
        <div className={s.profileClass}>

            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isMyProfile={props.isMyProfile}
                         updateProfilePhoto={props.updateProfilePhoto}
                         updateProfileData={props.updateProfileData}/>

            <MyPosts newPostData={props.newPostData}
                     posts={props.posts}
                     addPost={props.addPost}
                     updateNewPostText={props.updateNewPostText}
                     profile={props.profile}/>

        </div>
    );
};

export default Profile;