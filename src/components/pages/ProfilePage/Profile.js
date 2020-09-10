import React from "react";

import s from './Profile.module.css';
import ProfileInfo from "./InnerComponents/ProfileInfo/ProfileInfo";
import ProfilePosts from "./InnerComponents/Posts/ProfilePosts/ProfilePosts";

const Profile = (props) => {

    return (
        <div className={s.profileClass}>

            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         isMyProfile={props.isMyProfile}
                         updateProfilePhoto={props.updateProfilePhoto}
                         updateProfileData={props.updateProfileData}
                         pageErrors={props.pageErrors}/>

            <ProfilePosts posts={props.posts}
                          addPost={props.addPost}
                          updateNewPostText={props.updateNewPostText}
                          profile={props.profile}/>

        </div>
    );
};

export default Profile;