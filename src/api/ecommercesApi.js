import axiosClient from "./axiosClient";

const ecommercesApi = {
    async getAll() {
        const url = `/ecommerce`;
        return axiosClient.get(url);
    },
    async getAllwithPag(index, size) {
        const url = `/ecommerce/all-paging?page_index=${index}&page_size=${size}`;
        return axiosClient.get(url);
    },
    async create(data) {
        const url = `/ecommerce`;
        return axiosClient.post(url, data);
    },
    async uploadImage(data) {
        const url = `/upload/upload-array`;
        return axiosClient.post(url, data);
    },
    async getDetail(id) {
        const url = `/ecommerce/${id}`;
        return axiosClient.get(url);
    },
    async delete(id) {
        const url = `/ecommerce/${id}`;
        return axiosClient.delete(url);
    },
    async update(data, id) {
        const url = `/ecommerce/${id}`;
        return axiosClient.put(url, data);
    },
};

export default ecommercesApi;
