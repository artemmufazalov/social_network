import s from "./MessageItem.module.css";
import React from "react";

export const MessagesParser = (props) => {
    if (props.message.to === "Me") {
        return (
            <div className={s.toMeMessage}>
                <Message text={props.message.message} name={props.message.from} time={props.message.time}/>
            </div>
        );
    } else {
        return (
            <div className={s.fromMeMessage}>
                <Message text={props.message.message} name={props.message.from} time={props.message.time}/>
            </div>
        );
    }
}

const Message = (props) => {
    return (
        <span className={s.message}>
            <div className={s.messageProps}>
                <span className={s.messageSender}>
                    {props.name}
                </span>
                <span className={s.messageTime}>
                    {props.time}
                </span>
            </div>

            <div className={s.messageText}>
                {props.text}
            </div>

        </span>
    );
}

export default Message;