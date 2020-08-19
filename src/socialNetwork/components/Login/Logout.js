import React from 'react';
import {logout} from "../../../redux/authReducer";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const Logout = (props) => {
    props.logout();

    return (
        <div>
            <Redirect to={"/"} />
        </div>
    );
};

export default connect(null, {logout})(Logout);