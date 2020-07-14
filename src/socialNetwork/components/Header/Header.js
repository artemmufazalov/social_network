import React from "react";
import logo from "../../../logo.svg";
import s from './Header.module.css';

const Header = () => {
    return (
        <header className={s.headerClass}>
            <img src={logo} className={s.logo}/>
        </header>
    );
};

export default Header;