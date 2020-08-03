import React from "react";
import s from "./Messages.module.css";
import {MessagesParser} from "./Message";
import DialogItem from "./Dialog";
import {Redirect} from "react-router-dom";

const Messages = (props) => {

    let sendNewMessage = () => {
        let from = "Me";
        let to = "John";
        props.sendNewMessage(from, to);
    }
    let updateNewMessageText = (event) => {
        let text = event.target.value;
        props.updateNewMessageText(text);
    }

    if (!props.isAuth) {return <Redirect to="/login"/>;}

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


                <div className={s.newMessageBox}>
                    <div className={s.newMessageTextArea}>
                        <textarea rows="5"
                                  value={props.state.messagesPage.newMessageData.text}
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
