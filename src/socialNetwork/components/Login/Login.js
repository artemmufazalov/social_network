import React from "react";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

const LoginPage = (props) => {
    if (props.isAuth) {
        switch (props.match.params.componentName) {
            case "ProfileContainer":
                return <Redirect to={"/profile"}/>
            case "Messages":
                return <Redirect to={"/messages"}/>
            case "UsersContainer":
                return <Redirect to={"/users"}/>
            default:
                return null;
        }
    }
    return (
        <div>login</div>
    );

}

export default connect(mapStateToProps, {})(withRouter(LoginPage));
