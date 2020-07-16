import React from "react";
import logo from "../../../logo.svg";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <header className={s.headerClass}>
                <NavLink to="/">
                    <img src={logo} className={s.logo} alt="icon"/>
                </NavLink>
        </header>
    );
};

export default Header;