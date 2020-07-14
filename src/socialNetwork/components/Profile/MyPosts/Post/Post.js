import React from "react";
import s from './Post.module.css';
import ProfileProps from "../../ProfileProps";
import likeLogo from "../../../../res/images/likeLogo.png"

const Post = ({text,time,likesCount}) => {
    return (

        <div className={s.mainBody}>

            <div>
                <img src={ProfileProps.getLogo()} className={s.logo}/>
            </div>

            <div className={s.postTime}>{time}</div>

            <div className={s.name}>{ProfileProps.profileName}</div>

            <div className={s.text}>
                {text}
            </div>

            <div className={s.footer}>
                <span className={s.likesCount}>
                    {likesCount}
                </span>
                <span className={s.buttonGrid}>
                    <input type="image" src={likeLogo} className={s.btn}/>
                </span>
            </div>

        </div>
    );
};

export default Post;