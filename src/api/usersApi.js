import axiosClient from './axiosClient';

const usersApi = {
    async register(data) {
        const url = `/users/register-web`;
        return axiosClient.post(url, data);
    },
    async login(data) {
        const url = `/users/login`;
        return axiosClient.post(url, data);
    },
    async loginGoolge(data) {
        const url = `/users/login-with-google`;
        return axiosClient.post(url, data);
    },
    async loginFacebook(data) {
        const url = `/users/login-with-facebook`;
        return axiosClient.post(url, data);
    },
    async getListUser() {
        const url = `/users`;
        return axiosClient.get(url);
    },
    async getAllwithPag(index, size) {
        const url = `/users/all-paging?page_index=${index}&page_size=${size}`;
        return axiosClient.get(url);
    },
    async createUser(data) {
        const url = `/users/create`;
        return axiosClient.post(url, data);
    },
    async uploadImage(data) {
        const url = `/upload/upload-array`;
        return axiosClient.post(url, data);
    },
    async deleteUser(id) {
        const url = `/users/${id}`;
        return axiosClient.delete(url);
    },
    async updateUser(id, data) {
        const url = `/users/${id}`;
        return axiosClient.put(url, data);
    },
    async getDetailUser(id) {
        const url = `/users/${id}`;
        return axiosClient.get(url);
    },
    async getRol() {
        const url = `/roles`;
        return axiosClient.get(url);
    },
    async sendVerifyWeb(data) {
        const url = `/users/verify-email-web`;
        return axiosClient.post(url, data);
    },
    async forgetPassWordWeb(data) {
        const url = `/users/forgot-password`;
        return axiosClient.post(url, data);
    },
    async confirmRegister(data) {
        const url = `users/confirm/token`;
        return axiosClient.post(url, data);
    },
};

export default usersApi;
