import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import NewPost from "./Post/NewPost";

const MyPosts = (props) => {

    let posts = props.posts.map(p => <Post text={p.text} time={p.time} likesCount={p.likesCount} key={p.id}
                                           photo={props.profile.photos.small} name={props.profile.fullName}/>);

    return (
        <div className={s.newsFeed}>

            <NewPost newPostData={props.newPostData}
                     addPost={props.addPost}
                     updateNewPostText={(text) => {
                         props.updateNewPostText(text)
                     }}
                     photo={props.profile.photos.small}
            />

            <header className={s.header}>
                Posts
            </header>

            <div>
                {posts}
            </div>
        </div>
    );
}

export default MyPosts;