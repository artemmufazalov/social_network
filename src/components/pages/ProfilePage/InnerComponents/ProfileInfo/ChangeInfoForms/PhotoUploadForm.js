import React, {useState} from 'react';

import s from "../ProfileInfo.module.css";

const PhotoUploadForm = (props) => {

    const [newProfilePhoto, setNewProfilePhoto] = useState(null);

    const onMainPhotoSelected = (e) => {
        let photo = e.target.files[0];
        setNewProfilePhoto(photo);
    }

    const updateProfilePhoto = async () => {
        let resultCode = await props.updateProfilePhoto(newProfilePhoto);
        if (resultCode === 0) {
            props.deactivatePhotoUpload();
        }
    }

    return (
        <div className={s.editFormWrapper}>

            <div className={s.exitButtonWrapper}>
                <button onClick={props.deactivatePhotoUpload}>X</button>
            </div>

            <h3>Change photo</h3>

            <div className={s.photoUploadWrapper}>

                <div>
                    <input type="file" onChange={onMainPhotoSelected}/>
                </div>

                <div className={s.submitButtonWrapper}>
                    <button onClick={updateProfilePhoto}>
                        Save
                    </button>
                </div>

                <div className={s.errorWrapper}>
                    {props.pageErrors.photoUploadError ?
                        <span className={s.error}>{props.pageErrors.photoUploadError}</span>
                        : null}
                </div>
            </div>


        </div>
    );
};

export default PhotoUploadForm;