import React from "react";
import classNames from "classnames";

import messageStyles from "./Messages/MessageItem.module.css"
import messagesContainerStyles from "./Messages.module.css";
import MessageItem from "./Messages/MessageItem";
import AddNewMessageFormRedux from "./Messages/NewMessageForm";
import DialogItem from "./DialogsList/DialogItem";

const MessagesParser = (props) => {

    return (
        <div className={classNames({
            [messageStyles.toMeMessage]: props.message.to === "Me",
            [messageStyles.fromMeMessage]: props.message.to !== "Me"
        })}>
            <MessageItem text={props.message.message} name={props.message.from} time={props.message.time}/>
        </div>
    );
}

const Messages = (props) => {

    const addNewMessage = (values) => {
        let from = "Me";
        let to = "John";
        props.sendNewMessage(from, to, values.newMessageBody);
    }

    return (
        <div className={messagesContainerStyles.mainContainer}>
            <div className={messagesContainerStyles.dialogsContainer}>
                {props.state.messagesPage.dialogsData.map(data => (
                    <DialogItem name={data.name} id={data.id} key={data.id}/>))}
            </div>

            <div className={messagesContainerStyles.messagesMainContainer}>
                <div className={messagesContainerStyles.messagesContainer}>
                    {props.state.messagesPage.dialogsData[0].messages.map(m => <MessagesParser message={m}
                                                                                               key={m.id}/>)}
                </div>

                <AddNewMessageFormRedux
                    state={props.state}
                    onSubmit={addNewMessage}
                />

            </div>

        </div>
    );
}

export default Messages;
