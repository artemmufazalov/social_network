import {NavLink} from "react-router-dom";
import React from "react";

import s from "../Messages.module.css";

const DialogItem = (props) => {
    let path = "/messages/" + props.id;

    return (
        <div className={s.dialog}>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;