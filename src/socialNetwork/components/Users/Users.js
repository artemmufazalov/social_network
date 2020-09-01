import React from "react";
import s from "./Users.module.css";
import {defaultProfileLogo as defaultPagePhoto } from "../common/Defaults/defaultValues"
import {NavLink} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";

//TODO: make a separate User component

const Users = (props) => {

    return (
        <div>
            <div>
                <Paginator totalCount={props.totalUsersCount}
                           onPageChange={props.onPageNumberClick}
                           pageSize={props.pageSize}
                           currentPage={props.currentPage}/>
            </div>

            <div className={s.usersContainer}>
                {props.users.map(user => (
                    <div key={user.id} className={s.user}>
                             <span>
                                 <div>
                                     <NavLink to={'/profile/' + user.id}>
                                          <img src={user.photos.small != null ? user.photos.small : defaultPagePhoto}
                                               alt=""
                                               className={s.logo}/>
                                     </NavLink>
                                </div>
                                 <div>
                                    {user.followed ?
                                        <button className={s.btn}
                                                disabled={props.isFollowingInProgress.some(id => id === user.id)}
                                                onClick={() => {
                                                    props.unfollow(user.id)
                                                }}
                                        >unfollow</button>
                                        :
                                        <button className={s.btn}
                                                disabled={props.isFollowingInProgress.some(id => id === user.id)}
                                                onClick={() => {
                                                    props.follow(user.id)
                                                }}
                                        >follow</button>}
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
        </div>
    );
}

export default Users;