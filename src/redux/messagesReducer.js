import {getTime} from "./timeFunctions";

const SEND_NEW_MESSAGE = "SEND-NEW-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

export const messagesReducer = (state, action) => {

    switch (action.type) {
        case SEND_NEW_MESSAGE:
            //{from: ,to: ,}
            let time = getTime();
            let to = action.to;
            let from = action.from;
            let newMessage = {
                time: time,
                from: from,
                to: to,
                message: state.newMessageData.text,
            }
            state.dialogsData[0].messages.push(newMessage);
            state.newMessageData.text = "";
            return state;
        case UPDATE_NEW_MESSAGE_TEXT:
            //{text: ,}
            state.newMessageData.text = action.text;
            return state;
        default:
            return state;
    }
}

export const sendNewMessageActionCreator = (from, to) =>
    ({type: SEND_NEW_MESSAGE, from: from, to: to})

export const updateNewMessageTextActionCreator = (text) =>
    ({type: UPDATE_NEW_MESSAGE_TEXT, text: text,})
