import React from "react";
import s from "./Preloader.module.css";
import preloader from "../../../res/Spinner-1.3s-200px.svg";

const Preloader = () => {
    return (
        <img alt=""
             src={preloader}
             className={s.preloader}
        />
    );
}

export default Preloader;