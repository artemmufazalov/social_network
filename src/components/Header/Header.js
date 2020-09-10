import React from "react";
import {NavLink} from "react-router-dom";

import {mainLogo as logo} from "../common/Defaults/defaultValues.js";
import {defaultProfileLogo} from "../common/Defaults/defaultValues.js";
import s from './Header.module.css';
import Preloader from "../common/Preloader/Preloader";

const Header = (props) => {
    return (
        <header className={s.headerClass}>
            <NavLink to="/">
                <img src={logo} className={s.logo} alt="icon"/>
            </NavLink>

            <span className={s.loginBlock}>
                <span className={s.logInOut}>
                    {!props.isAuth ?
                        <NavLink to={'/login'}>
                            Login
                        </NavLink>
                        :
                        <NavLink to={'/logout'}>
                            Logout
                        </NavLink>}
                </span>

                <span className={s.photoBlock}>
                    {props.isAuth ?
                        <NavLink to={'/profile/' + props.userId}>
                            {(props.currentUserProfile != null) ?
                                <img src={props.currentUserProfile.photos.small != null ?
                                    props.currentUserProfile.photos.small
                                    : defaultProfileLogo}
                                     alt="" className={s.profileLogo}/>
                                : <span>
                                <Preloader custom className={s.preloader}/>
                            </span>
                            }
                        </NavLink>
                        :
                        null}
                </span>

            </span>


        </header>
    );
};

export default Header;