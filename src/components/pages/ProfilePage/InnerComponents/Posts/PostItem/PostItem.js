import React from "react";

import s from './PostItem.module.css';
import {defaultProfileLogo as defaultPagePhoto} from "../../../../../common/Defaults/defaultValues";
import {likeLogo} from "../../../../../common/Defaults/defaultValues";

const PostItem = (props) => {
    return (

        <div className={s.mainBody}>

            <div>
                <img src={props.photo!=null?props.photo:defaultPagePhoto} className={s.logo} alt=""/>
            </div>

            <div className={s.postTime}>{props.time}</div>

            <div className={s.name}>{props.name}</div>

            <div className={s.text}>
                {props.text}
            </div>

            <div className={s.footer}>
                <span className={s.likesCount}>
                    {props.likesCount}
                </span>
                <span className={s.buttonGrid}>
                    <input type="image" src={likeLogo} className={s.btn} alt=""/>
                </span>
            </div>

        </div>
    );
};

export default PostItem;