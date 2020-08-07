import React from "react";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={"input"} name={"login"} type="text" placeholder={"login"}/>
            </div>
            <div>
                <Field component={"input"} name={"password"} type="text" placeholder={"password"}/>
            </div>
            <div>
                <Field component={"input"} name={"rememberMe"} type="checkbox"/> remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: "login",})(LoginForm);

const LoginPage = (props) => {
    const onSubmit = (formData) => {
        console.log(formData)
    }

    if (props.isAuth) {
        switch (props.match.params.componentName) {
            case "ProfileContainer":
                return <Redirect to={"/profile"}/>
            case "Messages":
                return <Redirect to={"/messages"}/>
            case "UsersContainer":
                return <Redirect to={"/users"}/>
            default:
                return <Redirect to={"/"}/>;
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );

}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(withRouter(LoginPage));
