import React from "react";
import {Field, reduxForm} from "redux-form";

import s from "../Messages.module.css";
import {maxLengthCreator, required} from "../../../../utils/validators/validators";
import {Textarea} from "../../../common/FormsControls/FormControls";


const maxLength100 = maxLengthCreator(100);

const NewMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}
              className={s.newMessageBox}>
            <div className={s.newMessageTextArea}>
                <Field component={Textarea}
                       name={"newMessageBody"}
                       placeholder="Enter your message"
                       rows="5"
                       validate={[required, maxLength100]}/>
            </div>
            <div className={s.buttonBox}>
                <button className={s.sendButton}>
                    Send
                </button>
            </div>
        </form>
    );
};

export default reduxForm({form: "addNewMessageForm"})(NewMessageForm);