import React from "react";
import s from './Post.module.css';
import likeLogo from "../../../../res/images/likeLogo.png";
import defaultPagePhoto from "../../../../res/images/defaultPagePhoto.png"

const Post = (props) => {
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

export default Post;