import React from "react";
import s from "./Users.module.css";
import defaultPagePhoto from "../../res/images/defaultPagePhoto.png";

const checkForValue = (number, currentPage, totalPagesCount) => {
    switch (number) {
        case 1:
            return 1;
        case 2:
            return (currentPage > 4) ? "..." : 2;
        case 3:
            return (currentPage < 5) ? 3
                : (currentPage > totalPagesCount - 3) ? (totalPagesCount - 4)
                    : currentPage - 1;
        case 4:
            return (currentPage < 5) ? 4
                : (currentPage > totalPagesCount - 3) ? (totalPagesCount - 3)
                    : currentPage;
        case 5:
            return (currentPage < 5) ? 5
                : (currentPage > totalPagesCount - 3) ? (totalPagesCount - 2)
                    : currentPage + 1
        case 6:
            return (currentPage < totalPagesCount - 3) ? "..."
                : (totalPagesCount - 1);
        case 7:
            return totalPagesCount;
        default:
            return null;
    }
}

const Users = (props) => {

    let totalPagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let numbers = [];
    if (totalPagesCount > 7) {
        for (let i = 1; i <= 7; i++) {
            numbers.push(checkForValue(i, props.currentPage, totalPagesCount));
        }
    } else {
        for (let i = 1; i <= totalPagesCount; i++) {
            numbers.push(i)
        }
    }


    return (
        <div>
            <div>
                {numbers.map(number => {
                    return (
                        <span
                            className={`${(props.currentPage === number) ? s.selectedPage : null} ${s.pageNumber}`}
                            onClick={() => {
                                if (number !== "...") {
                                    props.onPageNumberClick(number)
                                }
                            }}
                        >{number}</span>
                    );
                })}
            </div>

            <div className={s.usersContainer}>
                {props.users.map(user => (
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
                                            props.unfollow(user.id)
                                        }} className={s.btn}>unfollow</button>
                                        :
                                        <button onClick={() => {
                                            props.follow(user.id)
                                        }} className={s.btn}>follow</button>}
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