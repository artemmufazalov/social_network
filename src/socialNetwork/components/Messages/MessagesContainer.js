import React from "react";
import {sendNewMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/messagesReducer";
import Messages from "./Messages";
import StoreContext from "../../../storeContext";

const MessagesContainer = () => {

    return (
        <StoreContext.Consumer>
            {(store) => {

                let sendNewMessage = () => {
                    let from = "Me";
                    let to = "John";
                    store.dispatch(sendNewMessageActionCreator(from, to));
                }
                let updateNewMessageText = (text) => {
                    store.dispatch(updateNewMessageTextActionCreator(text));
                }

                return (
                    <Messages sendMessage={sendNewMessage}
                              updateNewMessageText={updateNewMessageText}
                              state={store.getState()}
                    />
                );
            }

            }

        </StoreContext.Consumer>


    );
}
export default MessagesContainer;