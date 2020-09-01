import React from "react";
import s from "./ProfileInfo.module.css";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormControls";

const firstLetterToUpperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const ProfileDataForm = (props) => {

    return (
        <div>
            <div className={s.editFormWrapper}>
                <div className={s.exitButtonWrapper}>
                    <button onClick={props.deactivateEditMode}>X</button>
                </div>


                <div>
                    <form onSubmit={props.handleSubmit} className={s.formsWrapper}>
                        <h3>Change profile data</h3>


                        <div className={s.wrapper}>
                            <div className={s.labels}>
                                <b>Name:</b>
                            </div>
                            <div className={s.forms}>
                                <Field component={Input} placeholder={"Name"}
                                       name={"fullName"} type={"text"} validate={[]}/>
                            </div>
                        </div>

                        <div className={s.wrapper}>
                            <div className={s.labels}>
                                <b>About me:</b>
                            </div>
                            <div className={s.forms}>
                                <Field component={Textarea} placeholder={"About me"}
                                       name={"aboutMe"} type={"text"} validate={[]}/>
                            </div>
                        </div>

                        <div className={s.wrapper}>
                            <div className={s.labels}>
                                <b>Looking fo a job:</b>
                            </div>

                            <div className={s.forms}>
                                <Field component={Input}
                                       name={"lookingForAJob"} type={"checkbox"} validate={[]}/>
                            </div>

                        </div>

                        <div className={s.wrapper}>
                            <div className={s.labels}>
                                <b>Looking for a job description:</b>
                            </div>
                            <div className={s.forms}>
                                <Field component={Textarea} placeholder={"Description"}
                                       name={"lookingForAJobDescription"} type={"text"} validate={[]}/>
                            </div>
                        </div>

                        <div>
                            {Object.keys(props.profile.contacts).map(key => {
                                    let newKey = firstLetterToUpperCase(key);
                                    if (key === "vk") {
                                        newKey = key.toUpperCase();
                                    }
                                    return (<div key={key} className={s.wrapper}>
                                        <div className={s.labels}>
                                            <b>{newKey}:</b>
                                        </div>
                                        <div className={s.forms}>
                                            <Field component={Input} placeholder={newKey}
                                                   name={key} type={"text"} validate={[]}/>
                                        </div>
                                    </div>);
                                }
                            )}
                        </div>

                        <div className={s.submitButtonWrapper}>
                            <button>Submit</button>
                        </div>

                    </form>

                    <div className={s.errorWrapper}>
                        {props.error && <div className={s.error}>
                            {props.error}
                        </div>}
                    </div>


                </div>

            </div>

        </div>
    );
}

export default reduxForm({form: "editProfileData"})(ProfileDataForm);