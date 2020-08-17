import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
    profile: state.profilePage.profile,
});

export const withAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                if (Component.name === "ProfileContainer" && this.props.profile) {
                    return <Redirect to={`/login/${Component.name}/${this.props.profile.userId}`}/>;
                } else {
                    return <Redirect to={`/login/${Component.name}`}/>;
                }
            }

            return <Component {...this.props}/>
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
}