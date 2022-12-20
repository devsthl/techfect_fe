import axiosClient from '../axiosClient';

const likesApi = {
    async like(data) {
        const url = `likes/`;
        return axiosClient.post(url, data);
    },
    async getLikeProduct(data) {
        const url = `/likes/get-like-product`;
        return axiosClient.get(url);
    },
};

export default likesApi;
