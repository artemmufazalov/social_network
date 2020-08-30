import React, {useState} from "react";
import s from "./ProfileInfo.module.css";
import defaultProfileLogo from "../../res/images/defaultPagePhoto.png"
import facebookLogo from "../../res/logos/facebook.svg"
import githubLogo from "../../res/logos/github.svg"
import instagramLogo from "../../res/logos/instagram.svg"
import twitterLogo from "../../res/logos/twitter.svg"
import vkLogo from "../../res/logos/vk.svg"
import youtubeLogo from "../../res/logos/youtube.svg"
import ProfileStatus from "./ProfileStatus.js"

//TODO: make contacts a separate component
//TODO: make a file with common values (such as websites logos or default profile photo)

const ProfileInfo = (props) => {
    const [isPhotoUploadEnabled, setPhotoUploadEnabled] = useState(false);
    const [wrongInput, setWrongInputMode] = useState(false);

    let newProfilePhoto = null;

    const activatePhotoUpload = () => {
        if (props.isMyProfile) {
            setPhotoUploadEnabled(true);
        }
    }

    const deactivatePhotoUpload = () => {
        setPhotoUploadEnabled(false);
    }

    const onMainPhotoSelected = (e) => {
        newProfilePhoto = e.target.files[0];
    }

    const updateProfilePhoto = () => {
        if (newProfilePhoto) {
            props.updateProfilePhoto(newProfilePhoto);
            setPhotoUploadEnabled(false);
        } else {
            setWrongInputMode(true);
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
                             onDoubleClick={activatePhotoUpload}/>
                    </div>

                    <div className={s.changeInfoWrapper}>
                        {isPhotoUploadEnabled ?
                            <div className={s.uploadPhotoWindow}>
                                <div>
                                    <input type="file" onChange={onMainPhotoSelected}/>
                                </div>
                                <div>
                                    <button className={s.setPhotoButton}
                                            onClick={updateProfilePhoto}>
                                        Save
                                    </button>

                                    <button className={s.closeButton} onClick={deactivatePhotoUpload}>x</button>

                                    {wrongInput ?
                                        <span className={s.wrongInput}>
                                            Something Wrong
                                        </span>
                                        : null}

                                </div>
                            </div>
                            : null}
                    </div>

                    <div className={s.profileInfo}>
                        <div className={s.name}>
                            {props.profile.fullName}
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
                            {((props.profile.contacts.facebook != null) && (props.profile.contacts.facebook.includes("facebook.com"))) ?
                                <span>
                                <a href={props.profile.contacts.facebook.includes("https") ? props.profile.contacts.facebook : ("https://" + props.profile.contacts.facebook)}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={facebookLogo} alt="" className={s.contactsImage}/>
                                </a>
                            </span>
                                : null}
                            {((props.profile.contacts.vk != null) && (props.profile.contacts.vk.includes("vk.com"))) ?
                                <span>
                                <a href={props.profile.contacts.vk.includes("https") ? props.profile.contacts.vk : ("https://" + props.profile.contacts.vk)}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={vkLogo} alt="" className={s.contactsImage}/>
                                </a>
                            </span>
                                : null}
                            {((props.profile.contacts.twitter != null) && (props.profile.contacts.twitter.includes("twitter.com"))) ?
                                <span>
                                <a href={props.profile.contacts.twitter.includes("https") ? props.profile.contacts.twitter : ("https://" + props.profile.contacts.twitter)}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={twitterLogo} alt="" className={s.contactsImage}/>
                                </a>
                            </span>
                                : null}
                            {((props.profile.contacts.instagram != null) && (props.profile.contacts.instagram.includes("instagram.com"))) ?
                                <span>
                                <a href={props.profile.contacts.instagram.includes("https") ? props.profile.contacts.instagram : ("https://" + props.profile.contacts.instagram)}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={instagramLogo} alt="" className={s.contactsImage}/>
                                </a>
                            </span>
                                : null}
                            {((props.profile.contacts.github != null) && (props.profile.contacts.github.includes("github.com"))) ?
                                <span>
                                <a href={props.profile.contacts.github.includes("https") ? props.profile.contacts.github : ("https://" + props.profile.contacts.github)}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={githubLogo} alt="" className={s.contactsImage}/>
                                </a>
                            </span>
                                : null}
                            {((props.profile.contacts.youtube != null) && (props.profile.contacts.youtube.includes("youtube.com"))) ?
                                <span>
                                <a href={props.profile.contacts.youtube.includes("https") ? props.profile.contacts.youtube : ("https://" + props.profile.contacts.youtube)}
                                   target="_blank" rel="noopener noreferrer">
                                    <img src={youtubeLogo} alt="" className={s.contactsImage}/>
                                </a>
                            </span>
                                : null}
                        </div>

                    </div>
                </div>
            }
        </div>
    );
}


export default ProfileInfo;