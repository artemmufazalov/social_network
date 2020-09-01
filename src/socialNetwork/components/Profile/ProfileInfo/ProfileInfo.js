import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import {defaultProfileLogo} from "../../common/Defaults/defaultValues"
import ProfileStatus from "./ProfileStatus.js"
import Contact from "./Contact";
import ProfileDataForm from "./ProfileDataForm";
import PhotoUploadForm from "./PhotoUploadForm";

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
    const onFormSubmit = (formData) => {
        let resultCode = props.updateProfileData(formData, props.profile);
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
                                                                        deactivatePhotoUpload={deactivatePhotoUpload}/>
                            : null}

                        {editMode ? <ProfileDataForm deactivateEditMode={deactivateEditMode}
                                                     profile={props.profile}
                                                     onSubmit={onFormSubmit}/>
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