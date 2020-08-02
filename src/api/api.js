import * as axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '4af23d3e-a1fa-432e-980b-382d82c7d9eb'
    }
})

export const UserAPI = {
    getUserProfile(userId) {
        return axiosInstance.get(`profile/${userId}`)
            .then(response => response.data);
    },
    getUsers(pageSize = 10, pageNumber = 1) {
        return axiosInstance.get(`users?count=${pageSize}&page=${pageNumber}`)
            .then(response => response.data);
    }
};

export const FollowAPI = {
    followRequest(userId) {
        return axiosInstance.post(`follow/${userId}`)
            .then(response => response.data);
    },
    unfollowRequest(userId) {
        return axiosInstance.delete(`follow/${userId}`)
            .then(response => response.data);
    },
};

export const AuthAPI = {
    authMe() {
        return axiosInstance.get('auth/me')
            .then(response => response.data);
    },
};


