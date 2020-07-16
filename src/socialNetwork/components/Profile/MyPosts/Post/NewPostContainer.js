import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../../redux/postsReducer";
import NewPost from "./NewPost";

const NewPostContainer = (props) => {

    let addNewPost =() => {
        props.store.dispatch(addPostActionCreator());
    }

    let onPostChange = (text) => {
        props.store.dispatch(updateNewPostTextActionCreator(text));
    }

    return (
        <NewPost addNewPost = {addNewPost}
                 onPostChange = {onPostChange}
                 newPostData = {props.store.getState().postsData.newPost}
        />

    );
};

export default NewPostContainer;