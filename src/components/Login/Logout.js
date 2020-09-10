import React from 'react';
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

import {logout} from "../../BLL/reducers/authReducer";

const Logout = (props) => {
    props.logout();

    return (
        <div>
            <Redirect to={"/login"} />
        </div>
    );
};

export default connect(null, {logout})(Logout);