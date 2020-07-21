import React from "react";
import s from "./Users.module.css";
import * as axios from "axios";
import defaultPagePhoto from "../../res/images/defaultPagePhoto.png";

class Users extends React.Component {

    componentDidMount() {
        this.getUsers();
    }

    getUsers = (pageNumber = 1) => {
        //data.items {id:,name:,status:,photos{small:,large:},followed:}
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?count=${this.props.pageSize}&page=${pageNumber}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                if (this.props.totalUsersCount === 0) {
                    this.props.setTotalUsersCount(response.data.totalCount);
                }
            });
    }

    onPageNumberClick = (page) => {
        this.props.setCurrentPage(page);
        this.getUsers(page);
    }


    checkForValue = (number, currentPage, totalPagesCount) => {
        switch (number) {
            case 1:
                return 1;
            case 2:
                return (currentPage > 4) ? "..." : 2;
            case 3:
                return (currentPage < 5) ?
                    3 : (currentPage > totalPagesCount - 3) ?
                        (totalPagesCount - 4) : currentPage - 1;
            case 4:
                return (currentPage < 5) ?
                    4 : (currentPage > totalPagesCount - 3) ?
                        (totalPagesCount - 3) : currentPage;
            case 5:
                return (currentPage < 5) ?
                    5
                    :
                    (currentPage > totalPagesCount - 3) ?
                        (totalPagesCount - 2)
                        :
                        currentPage + 1
            case 6:
                return (currentPage < totalPagesCount - 3) ?
                    "..." : (totalPagesCount - 1);
            case 7:
                return totalPagesCount;
            default:
                return "";
        }
    }

    render() {
        let totalPagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= totalPagesCount; i++) {
            pages.push(i);
        }

        let numbers = [
            this.checkForValue(1, this.props.currentPage, totalPagesCount),
            this.checkForValue(2, this.props.currentPage, totalPagesCount),
            this.checkForValue(3, this.props.currentPage, totalPagesCount),
            this.checkForValue(4, this.props.currentPage, totalPagesCount),
            this.checkForValue(5, this.props.currentPage, totalPagesCount),
            this.checkForValue(6, this.props.currentPage, totalPagesCount),
            this.checkForValue(7, this.props.currentPage, totalPagesCount),
        ];

        return (
            <div>
                <div>
                    {numbers.map(number => {
                        return (
                            <span
                                className={`${(this.props.currentPage === number) ? s.selectedPage : null} ${s.pageNumber}`}
                                onClick={() => {
                                    if (number !== "...") {
                                        this.onPageNumberClick(number)
                                    }
                                }}
                            >{number}</span>
                        );
                    })}
                </div>

                {/*        <div>
                    {pages.map(page =>
                        <span className={`${(this.props.currentPage === page) ? s.selectedPage : null} ${s.pageNumber}`}
                              onClick={() => {
                                  this.onPageNumberClick(page)
                              }}
                        >
                        {page}
                        </span>)}
                </div>*/}


                <div className={s.usersContainer}>
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
                                        }} className={s.btn}>unfollow</button>
                                        :
                                        <button onClick={() => {
                                            this.props.follow(user.id)
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

}

export default Users;
