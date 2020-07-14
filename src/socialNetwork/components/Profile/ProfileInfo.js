import React from "react";
import s from "./ProfileInfo.module.css";
import ProfileProps from "./ProfileProps";


const ProfileInfo = () => {
    return (
        <div>
            <div className={s.imageContainer}>
                <img src={ProfileProps.getProfileMainImage()} className={s.pageMainImage}/>
            </div>

            <div className={s.profileContainer}>
                <div>
                    <img src={ProfileProps.getLogo()} className={s.profileLogo}/>
                </div>

                <div className={s.profileInfo}>
                    <div className={s.props}>
                        <div className={s.infoItem}>Name:</div>
                        <div className={s.infoItem}>Surname:</div>
                        <div className={s.infoItem}>Info:</div>
                    </div>
                    <div className={s.values}>
                        <div className={s.infoItem}>{ProfileProps.profileName}</div>
                        <div className={s.infoItem}>{ProfileProps.profileSurname}</div>
                        <div className={s.infoItem}>{ProfileProps.profileInfo}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;