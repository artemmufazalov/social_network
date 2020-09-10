import React from "react";
import classNames from "classnames";
import propTypes from "prop-types";

import s from "./Preloader.module.css";
import {preloaderSVG} from "../Defaults/defaultValues";

const Preloader = ({custom, className, large}) => {
    return (
        <img alt=""
             src={preloaderSVG}
             className={classNames(
                 {
                     [className]: custom,
                     [s.preloaderLarge]: !custom && large
                 }
             )}
        />
    );
}

Preloader.propTypes = {
    custom: propTypes.bool,
    className: propTypes.string,
    large: propTypes.bool,
}

Preloader.defaultProps = {
    large: true,
    custom: false
}

export default Preloader;