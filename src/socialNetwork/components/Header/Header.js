import React from "react";
import logo from "../../../logo.svg";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import defaultProfileLogo from "../../res/images/defaultPagePhoto.png";
import PreloaderCustom from "../common/Preloader/PreloaderCustom";

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
                                <PreloaderCustom className={s.preloader}/>
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