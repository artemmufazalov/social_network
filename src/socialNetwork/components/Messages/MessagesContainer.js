import {sendNewMessage, updateNewMessageText} from "../../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        state: state,
        isAuth: state.auth.isAuth,
    }
}

const MessagesContainer = connect(mapStateToProps, {
    sendNewMessage,
    updateNewMessageText,
})(Messages);

export default MessagesContainer;