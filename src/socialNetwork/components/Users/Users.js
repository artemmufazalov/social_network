import React from "react";
import s from "./Users.module.css";
import * as axios from "axios";
import defaultPagePhoto from "../../res/images/defaultPagePhoto.png";

const Users = (props) => {

    if (props.users.length === 0) {

        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                props.setUsers(response.data.items);
            })
    }
    /*if (props.users.length === 0) {
        props.setUsers(
            [
                {
                    followed: true,
                    id: 10001,
                    fullName: "John Smith",
                    status: "I'm a Trump supporter",
                    location: {
                        city: "Atlanta",
                        country: "USA",
                    },
                    photoURL: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Dmitry_Nagiev_2017_3.jpg",
                },
                {
                    followed: false,
                    id: 10002,
                    fullName: "Alex",
                    status: "Professional rapper",
                    location: {
                        city: "Ufa",
                        country: "Russia",
                    },
                    photoURL: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ijZpHeYKpRGA/v1/1000x-1.jpg",
                },
                {
                    followed: true,
                    id: 10003,
                    fullName: "Nikita",
                    status: "Potato man",
                    location: {
                        city: "Minsk",
                        country: "Belarus",
                    },
                    photoURL: "data:image/jpeg;base64,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",
                },
            ]
        );
    }*/

    return (
        <div>
            {props.users.map(user => (
                <div key={user.id}>
                    <span>
                        <div>
                            <img src={user.photos.small != null ? user.photos.small : defaultPagePhoto} alt=""
                                 className={s.logo}/>
                        </div>
                        <div>
                            {user.followed ?
                                <button onClick={() => {
                                    props.unfollow(user.id)
                                }}>unfollow</button>
                                :
                                <button onClick={() => {
                                    props.follow(user.id)
                                }}>follow</button>
                            }
                        </div>
                    </span>
                    <span>
                        <span>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </span>
                        {/*<span>
                            <div>{user.location.city}</div>
                            <div>{user.location.country}</div>
                        </span>*/}
                    </span>
                </div>
            ))
            }
        </div>
    );
}

export default Users;
