import React from "react";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormControls";
import styles from "./Login.module.css"
import {required} from "../../../utils/validators/validators";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Input} name={"login"} type="text" placeholder={"login"}
                       validate={[required]} className={styles.formItem}/>
            </div>
            <div className={styles.break}></div>
            <div>
                <Field component={Input} name={"password"} type="text" placeholder={"password"}
                       validate={[required]} className={styles.formItem}/>
            </div>
            <div className={styles.break}></div>
            <div className={styles.rememberMeBlock + " " + styles.formItem}>
                <span className={styles.rememberMeItem}>
                    <Field component={Input} name={"rememberMe"} type="checkbox"/>
                </span>
                <span className={styles.rememberMeItem}>
                           remember me
                </span>
            </div>
            <div className={styles.break}></div>
            <div>
                <button className={styles.submitButton}>Login</button>
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
                if (!props.match.params.userId) {
                    return <Redirect to={`/profile/`}/>;
                } else {
                    return <Redirect to={`/profile/${props.match.params.userId}`}/>;
                }
            case "Messages":
                return <Redirect to={"/messages"}/>
            case "UsersContainer":
                return <Redirect to={"/users"}/>
            default:
                return <Redirect to={"/"}/>;
        }
    }
    return (
        <div className={styles.loginBlock}>
            <div className={styles.loginTop}>
                <h2>Please login to continue</h2>
            </div>
            <div className={styles.formWrapper}>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
        </div>
    );

}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {})(withRouter(LoginPage));
