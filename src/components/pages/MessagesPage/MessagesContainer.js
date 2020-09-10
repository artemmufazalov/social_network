import {connect} from "react-redux";
import {compose} from "redux";

import {sendNewMessage} from "../../../BLL/reducers/messagesPageReducer";
import {withAuthRedirect} from "../../../hocs/WithAuthRedirect";
import Messages from "./Messages";

const mapStateToProps = (state) => {
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