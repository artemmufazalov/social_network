import React, {useEffect, useState} from "react";

import s from "../ProfileInfo.module.css";

const ProfileStatus = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);
    const [isStatusChanged, setStatusChanged] = useState(false);

    const activateEditMode = () => {
        if (props.isMyProfile) {
            setEditMode(true,);
        }
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        if (isStatusChanged) {
            props.updateStatus(status);
        }
        setStatusChanged(false);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
        setStatusChanged(true);
    };

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    return (
        <div>
            {!editMode && props.status !== "" && props.status !== null ?
                <div>
                    <div
                        onDoubleClick={activateEditMode}
                        className={s.statusText}>
                        {props.status}
                    </div>
                </div>
                : props.isMyProfile ?
                    <div onBlur={deactivateEditMode}
                         autoFocus={true}>
                        <input
                            onChange={onStatusChange}
                            type="text"
                            className={s.statusBox}
                            value={status}
                            placeholder={"change status"}/>
                    </div>
                    : null}
        </div>
    );
}

export default ProfileStatus;

