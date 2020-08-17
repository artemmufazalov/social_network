import {sendNewMessage} from "../../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../../hoc/WithAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        state: state,
    }
}

export default compose(
    connect(mapStateToProps, {
        sendNewMessage,
    }),
    withAuthRedirect,
)(Messages);