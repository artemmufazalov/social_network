import React, {useState} from "react";

import s from "./ProfileInfo.module.css";
import {defaultProfileLogo} from "../../../../common/Defaults/defaultValues"
import ProfileStatus from "./Status/ProfileStatus.js"
import Contact from "./Contacts/Contact";
import ProfileDataForm from "./ChangeInfoForms/ProfileDataForm";
import PhotoUploadForm from "./ChangeInfoForms/PhotoUploadForm";

//TODO: add extra fields with profile info (such as looking for a job (y/n) or looking for a job description

const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [isProfilePhotoUploadEnabled, setProfilePhotoUploadEnabled] = useState(false);


    const activateEditMode = () => {
        if (props.isMyProfile) {
            setEditMode(true);
        }
    }

    const activatePhotoUploadMode = () => {
        if (props.isMyProfile) {
            setProfilePhotoUploadEnabled(true);
        }
    }

    const deactivateEditMode = () => {
        setEditMode(false);
    }
    const deactivatePhotoUpload = () => {
        setProfilePhotoUploadEnabled(false);
    }
    const onFormSubmit = async (formData) => {
        let resultCode = await props.updateProfileData(formData);
        if (resultCode === 0) {
            deactivateEditMode();
        }
    }

    return (
        <div>
            {!props.profile ? null
                :
                <div className={s.profileContainer}>

                    <div>
                        <img src={!props.profile.photos.large ? defaultProfileLogo
                            : props.profile.photos.large}
                             className={s.profileLogo} alt=""
                             onDoubleClick={activatePhotoUploadMode}/>
                    </div>

                    <div className={s.changeInfoMainWrapper}>
                        {isProfilePhotoUploadEnabled ? <PhotoUploadForm updateProfilePhoto={props.updateProfilePhoto}
                                                                        profile={props.profile}
                                                                        pageErrors={props.pageErrors}
                                                                        deactivatePhotoUpload={deactivatePhotoUpload}/>
                            : null}

                        {editMode ? <ProfileDataForm deactivateEditMode={deactivateEditMode}
                                                     profile={props.profile}
                                                     onSubmit={onFormSubmit}
                                                     initialValues={props.profile}/>
                            : null}
                    </div>

                    <div className={s.profileInfo}>
                        <div className={s.name}>
                            {props.profile.fullName}
                        </div>
                        <div className={s.editButtonWrapper}>
                            <button onClick={activateEditMode}>
                                Edit
                            </button>
                        </div>
                        <div className={s.status}>
                            <ProfileStatus status={props.status}
                                           updateStatus={props.updateStatus}
                                           isMyProfile={props.isMyProfile}/>
                        </div>
                        <div className={s.props}>
                            {props.profile.aboutMe != null ? <div className={s.infoItem}>About:</div> : null}
                        </div>
                        <div className={s.values}>
                            <div className={s.infoItem}>{props.profile.aboutMe}</div>
                        </div>

                        <div className={s.contacts}>
                            {Object.keys(props.profile.contacts).map(key =>
                                (<Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>)
                            )}
                        </div>

                    </div>
                </div>
            }
        </div>
    );
}


export default ProfileInfo;