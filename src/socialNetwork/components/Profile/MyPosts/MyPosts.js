import React from "react";
import s from './MyPosts.module.css';
import Post from "./Post/Post";
import NewPostContainer from "./Post/NewPostContainer";

const MyPosts = (props) => {
    let posts = props.store.getState().postsData.posts.map(p =><Post text={p.text} time={p.time} likesCount={p.likesCount}/>);

    return (
        <div className={s.newsFeed}>

            <NewPostContainer store={props.store}/>

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