import React from "react";
import s from './NewPost.module.css';
import {Field, reduxForm} from "redux-form";

const NewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.newPostBody}>

            <div>
                <img src={props.photo} className={s.logo}
                     alt="profileLogo"/>
            </div>

            <div className={s.textArea}>
                <Field component={"textarea"}
                       rows="5" className={s.inputArea}
                       name={"newPostBody"}
                       placeholder={"Write something"}/>
            </div>

            <footer className={s.footer}>
                <button className={s.postButton}>
                    Post
                </button>
            </footer>

        </form>
    );
}

const NewPostReduxForm = reduxForm({form: "newPostForm"})(NewPostForm);

const NewPost = (props) => {

    let onAddNewPost = (values) => {
        props.addPost(values.newPostBody);
    }

    return (
        <div>
            <header className={s.header}>
                New Post
            </header>
            <NewPostReduxForm
                photo={props.photo}
                onSubmit={onAddNewPost}/>
        </div>

    );
};

export default NewPost;