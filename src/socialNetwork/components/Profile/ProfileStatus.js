import React from "react";
import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status,
        statusChanged: false,
    }

    activateEditMode = () => {
        if (this.props.myProfile) {
            this.setState({
                editMode: true,
            });
        }
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false,
        });
        if (this.state.statusChanged) {
            this.props.updateStatus(this.state.status);
        }
        this.setState({
                statusChanged: false
            }
        )

    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value,
            statusChanged: true,
        });
    }

    render() {
        return (
            <div>
                {!this.state.editMode && this.props.status !== "" && this.props.status !== null ?
                    <div>
                        <div
                            onDoubleClick={this.activateEditMode}
                            className={s.statusText}>
                            {this.props.status}
                        </div>
                    </div>
                    : this.props.myProfile ?
                        <div onBlur={this.deactivateEditMode}
                             autofocus={true}>
                            <input
                                onChange={this.onStatusChange}
                                type="text"
                                className={s.statusBox}
                                value={this.state.status}
                                placeholder={"change status"}/>
                        </div>
                        : null
                }
                <div>

                </div>
            </div>
        );
    }
}

export default ProfileStatus;

