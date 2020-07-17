import {sendNewMessageActionCreator, updateNewMessageTextActionCreator} from "../../../redux/messagesReducer";
import Messages from "./Messages";
import {connect} from "react-redux";

//data from state
let mapStateToProps = (state) =>{
    return{
        state: state,
    }
}
//callback functions
let mapDispatchToProps = (dispatch) =>{
    return{
        updateNewMessageText: (text)=>{
            dispatch(updateNewMessageTextActionCreator(text));
        },
        sendMessage: ()=>{
            let from = "Me";
            let to = "John";
            dispatch(sendNewMessageActionCreator(from, to));
        },
    }
}

const MessagesContainer = connect(mapStateToProps,mapDispatchToProps)(Messages);

export default MessagesContainer;