import React from "react";
import s from './NewPost.module.css';
import ProfileProps from "../../ProfileProps";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../../../redux/postsReducer";

const NewPost = (props) => {

    let newPostTextArea = React.createRef();

    function AddNewPost() {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = () => {
        let text = newPostTextArea.current.value;
        props.dispatch(updateNewPostTextActionCreator(text));
    }

    return (
        <div>
            <header className={s.header}>
                New Post
            </header>

            <div className={s.newPostBody}>

                <div>
                    <img src={ProfileProps.getLogo()} className={s.logo} alt="profileLogo"/>
                </div>

                <div className={s.textArea}>
                    <textarea ref={newPostTextArea} rows="5" className={s.inputArea}
                              value={props.newPostData.text}
                              onChange={onPostChange}/>
                </div>


                <footer className={s.footer}>
                    <button onClick={AddNewPost} className={s.postButton}>Post
                    </button>
                </footer>

            </div>

        </div>

    );
};

export default NewPost;