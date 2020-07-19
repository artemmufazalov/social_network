import React from "react";
import s from "./Users.module.css";
import * as axios from "axios";
import defaultPagePhoto from "../../res/images/defaultPagePhoto.png";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.getUsers();
    }

    getUsers = () => {
        //data.items {id:,name:,status:,photos{small:,large:},followed:}
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    }

    render() {
        return (
            <div>
                {this.props.users.map(user => (
                    <div key={user.id}>
                    <span>
                        <div>
                            <img src={user.photos.small != null ? user.photos.small : defaultPagePhoto}
                                 alt=""
                                 className={s.logo}/>
                        </div>
                        <div>
                            {user.followed ?
                                <button onClick={() => {
                                    this.props.unfollow(user.id)
                                }}>unfollow</button>
                                :
                                <button onClick={() => {
                                    this.props.follow(user.id)
                                }}>follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                    </span>
                    </div>
                ))
                }
            </div>
        );
    }

}

export default Users;
