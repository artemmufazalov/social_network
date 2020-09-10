import React from "react";
import classNames from "classnames";

import styles from "./Paginator.module.css";

const getValue = (number, currentPage, totalPagesCount) => {
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

const Paginator = ({totalCount, pageSize, currentPage, onPageChange, className}) => {

    let totalPagesCount = Math.ceil(totalCount / pageSize);

    let numbers = [];
    if (totalPagesCount > 7) {
        for (let i = 1; i <= 7; i++) {
            numbers.push(getValue(i, currentPage, totalPagesCount));
        }
    } else {
        for (let i = 1; i <= totalPagesCount; i++) {
            numbers.push(i)
        }
    }

    return (
        <div className={className}>
            {numbers.map(number => {
                return (
                    <span
                        className={classNames(styles.pageNumber, {
                            [styles.selectedPage]: currentPage === number
                        })}
                        onClick={() => {
                            if (number !== "...") {
                                onPageChange(number);
                            }
                        }}
                    >{number}</span>
                );
            })}
        </div>
    );
};

export default Paginator;
