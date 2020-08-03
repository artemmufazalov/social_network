import {sendNewMessage, updateNewMessageText} from "../../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";

let mapStateToProps = (state) => {
    return {
        state: state,
    }
}

let AuthRedirectComponent = withAuthRedirect(Messages);

const MessagesContainer = connect(mapStateToProps, {
    sendNewMessage,
    updateNewMessageText,
})(AuthRedirectComponent);

export default MessagesContainer;