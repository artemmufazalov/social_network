import React from "react";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../../redux/postsReducer";
import NewPost from "./NewPost";
import StoreContext from "../../../../../storeContext";


const NewPostContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {
                let addNewPost = () => {
                    store.dispatch(addPostActionCreator());
                }

                let onPostChange = (text) => {
                    store.dispatch(updateNewPostTextActionCreator(text));
                }

                return (
                <NewPost addNewPost={addNewPost}
                         onPostChange={onPostChange}
                         newPostData={store.getState().postsData.newPost}
                />);}
            }
        </StoreContext.Consumer>
    );
};

export default NewPostContainer;