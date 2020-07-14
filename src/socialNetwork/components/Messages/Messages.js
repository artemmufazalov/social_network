import React from "react";
import s from "./Messages.module.css";
import Message, {MessagesParser} from "./Message";
import DialogItem from "./Dialog";
import {sendNewMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/state";

const Messages = (props) => {

    let sendNewMessage = () => {
        let from = "Me";
        let to = "John";
        props.dispatch(sendNewMessageActionCreator(from, to));
    }
    let updateNewMessageText = (event) => {
        let text = event.target.value;
        props.dispatch(updateNewMessageTextActionCreator(text));
    }


    return (
        <div className={s.mainContainer}>
            <div className={s.dialogsContainer}>
                {props.state.dialogsData.map(data => (<DialogItem name={data.name} id={data.id}/>))}
            </div>

            <div className={s.messagesMainContainer}>
                <div className={s.messagesContainer}>
                    {props.state.dialogsData[0].messages.map(m => <MessagesParser message={m}/>)}
                </div>


                <div className={s.newMessageBox}>
                    <div className={s.newMessageTextArea}>
                        <textarea rows="5"
                                  value={props.state.newMessageData.text}
                                  onChange={updateNewMessageText}
                                  placeholder="Enter your message">
                        </textarea>
                    </div>
                    <div className={s.buttonBox}>
                        <button className={s.sendButton} onClick={sendNewMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Messages;
