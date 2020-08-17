import React from "react";
import s from "./Messages.module.css";
import {MessagesParser} from "./Message";
import DialogItem from "./Dialog";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";

const Messages = (props) => {

    let addNewMessage = (values) => {
        let from = "Me";
        let to = "John";
        props.sendNewMessage(from, to, values.newMessageBody);
    }
    return (
        <div className={s.mainContainer}>
            <div className={s.dialogsContainer}>
                {props.state.messagesPage.dialogsData.map(data => (
                    <DialogItem name={data.name} id={data.id} key={data.id}/>))}
            </div>

            <div className={s.messagesMainContainer}>
                <div className={s.messagesContainer}>
                    {props.state.messagesPage.dialogsData[0].messages.map(m => <MessagesParser message={m}
                                                                                               key={m.id}/>)}
                </div>

                <AddMessageFormRedux
                    state={props.state}
                    onSubmit={addNewMessage}
                />

            </div>

        </div>
    );
}

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

const AddMessageFormRedux = reduxForm({form: "addNewMessageForm"})(NewMessageForm);

export default Messages;
