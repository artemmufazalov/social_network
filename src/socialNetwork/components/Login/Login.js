import React from "react";
import {Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormControls";
import styles from "./Login.module.css"
import {required} from "../../../utils/validators/validators";
import {login} from "../../../redux/authReducer";

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field component={Input}
                       name={"email"}
                       placeholder={"Email"}
                       type={"text"}
                       validate={[required]}
                       className={styles.formItem}
                />
            </div>
            <div className={styles.break}></div>
            <div>
                <Field component={Input}
                       name={"password"}
                       placeholder={"Password"}
                       type={"password"}
                       validate={[required]}
                       className={styles.formItem}
                />
            </div>
            <div className={styles.break}></div>
            <div className={styles.rememberMeBlock + " " + styles.formItem}>
                <span className={styles.rememberMeItem}>
                    <Field component={Input}
                           name={"rememberMe"}
                           type={"checkbox"}
                    />
                </span>
                <span className={styles.rememberMeItem}>
                           remember me
                </span>
            </div>
            <div>
                <button className={styles.submitButton}>Login</button>
            </div>
            {error && <div className={styles.error}>
                {error}
            </div>}
        </form>
    );
}

const LoginReduxForm = reduxForm({form: "login",})(LoginForm);

const LoginPage = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }

    if (props.isAuth) {
        return <Redirect to={`/profile/`}/>;
    }

    return (
        <div className={styles.loginBlock}>
            <div className={styles.loginTop}>
                <h2>Please login to continue</h2>
            </div>
            <div className={styles.formWrapper}>
                <LoginReduxForm onSubmit={onSubmit}/>
            </div>
            <br/>
            <div>
                New on our website? Try this to taste it:
            </div>
            <div>
                Email: free@samuraijs.com
            </div>
            <div>
                Password: free
            </div>
        </div>
    );

}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, {
    login,
})(withRouter(LoginPage));
