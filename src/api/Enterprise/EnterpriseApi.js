import axiosClient from "../axiosClient";

const enterpriseApi = {
    getAll() {
        const url = `/enterprise`;
        return axiosClient.get(url);
    },
    get(id) {
        const url = `/enterprise/${id}`;
        return axiosClient.get(url);
    },
    create(data) {
        const url = `/enterprise`;
        return axiosClient.post(url, data);
    },
    edit(edit) {
        const url = `/enterprise/${edit.id}`;
        return axiosClient.put(url, edit);
    },
    delete(id) {
        const url = `/enterprise/${id}`;
        return axiosClient.delete(url);
    },
};
export default enterpriseApi;
