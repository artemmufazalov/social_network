import React from "react";

import s from './ProfilePosts.module.css';
import PostItem from "../PostItem/PostItem";
import NewPost from "../NewPost/NewPost";
import defaultPagePhoto from "../../../../../../res/defaults/defaultPagePhoto.png"

const ProfilePosts = React.memo((props) => {

    return (
        <div className={s.newsFeed}>
            {props.isMyProfile &&
            <NewPost addPost={props.addPost}
                     updateNewPostText={(text) => {
                         props.updateNewPostText(text)
                     }}
                     photo={!props.profile ? defaultPagePhoto
                         : !props.profile.photos.small ? defaultPagePhoto
                             : props.profile.photos.small}
            />}

            {!props.posts ? null :
                <header className={s.header}>
                    Posts
                </header>
            }

            <div>
                {!props.profile ? null
                    : props.posts.map(p => <PostItem text={p.text} time={p.time} likesCount={p.likesCount} key={p.id}
                                                     photo={props.profile.photos.small} name={props.profile.fullName}/>)
                }
            </div>
        </div>
    );
});

export default ProfilePosts;