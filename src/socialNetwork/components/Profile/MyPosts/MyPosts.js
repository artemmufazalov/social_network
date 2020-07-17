import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import NewPost from "./Post/NewPost";

const MyPosts = (props) => {

    let posts = props.postsData.posts.map(p => <Post text={p.text} time={p.time} likesCount={p.likesCount}/>);

    return (
        <div className={s.newsFeed}>

            <NewPost newPostData={props.newPostData}
                     addNewPost={props.addNewPost}
                     onPostChange={props.onPostChange}/>

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