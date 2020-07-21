import React from "react";
import s from './NewPost.module.css';
import ProfileProps from "../../ProfileProps";

const NewPost = (props) => {

    let newPostTextArea = React.createRef();

    function addNewPost() {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostTextArea.current.value;
        props.updateNewPostText(text);
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
                    <textarea rows="5" className={s.inputArea}
                              ref={newPostTextArea}
                              value={props.newPostData.text}
                              onChange={onPostChange}/>
                </div>


                <footer className={s.footer}>
                    <button onClick={addNewPost} className={s.postButton}>Post
                    </button>
                </footer>

            </div>

        </div>

    );
};

export default NewPost;