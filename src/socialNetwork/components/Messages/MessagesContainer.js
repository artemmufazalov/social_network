import React from "react";
import {sendNewMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/messagesReducer";
import Messages from "./Messages";

const MessagesContainer = (props) => {

    let sendNewMessage = () => {
        let from = "Me";
        let to = "John";
        props.store.dispatch(sendNewMessageActionCreator(from, to));
    }
    let updateNewMessageText = (text) => {
        props.store.dispatch(updateNewMessageTextActionCreator(text));
    }

    return (
        <Messages sendMessage={sendNewMessage}
                  updateNewMessageText={updateNewMessageText}
                  state={props.store.getState()}
        />
    );
}
export default MessagesContainer;