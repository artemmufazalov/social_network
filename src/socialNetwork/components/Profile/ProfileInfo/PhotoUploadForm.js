import React, {useState} from 'react';
import s from "./ProfileInfo.module.css";

const PhotoUploadForm = (props) => {

    const [wrongInput, setWrongInputMode] = useState(false);
    const [newProfilePhoto, setNewProfilePhoto] = useState(null);

    const onMainPhotoSelected = (e) => {
        setWrongInputMode(false);
        let photo = e.target.files[0];
        setNewProfilePhoto(photo);
    }

    const updateProfilePhoto = () => {
        if (newProfilePhoto) {
            props.updateProfilePhoto(newProfilePhoto);
            props.deactivatePhotoUpload();
        } else {
            setWrongInputMode(true);
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
                    {wrongInput ?
                        <span className={s.error}>Photo isn't selected</span>
                        : null}
                </div>
            </div>


        </div>
    );
};

export default PhotoUploadForm;