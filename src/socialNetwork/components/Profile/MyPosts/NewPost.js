import React from "react";
import s from './NewPost.module.css';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormControls";

const maxLength140 = maxLengthCreator(140);


const NewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.newPostBody}>

            <div>
                <img src={props.photo} className={s.logo}
                     alt="profileLogo"/>
            </div>

            <div className={s.textArea}>
                <Field component={Textarea}
                       rows="5" className={s.inputArea}
                       name={"newPostBody"}
                       placeholder={"Write something"}
                       validate={[required, maxLength140]}/>
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