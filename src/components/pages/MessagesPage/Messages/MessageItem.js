import React from "react";

import s from "./MessageItem.module.css";

const MessageItem = (props) => {
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

export default MessageItem;