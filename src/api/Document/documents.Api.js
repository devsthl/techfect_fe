import axiosClient from "../axiosClient";

const documentApi = {
    getAll() {
        const url = `/resources`;
        return axiosClient.get(url)
    },
    get(id) {
        const url = `/resources/${id}`
        return axiosClient.get(url)
    },
    create(data) {
        const url = `/resources`
        return axiosClient.post(url, data)
    },
    edit(edit) {
        const url = `/resources/${edit.id}`;
        return axiosClient.put(url, edit);
    },
    delete(id) {
        const url = `/resources/${id}`;
        return axiosClient.delete(url);
    },
}
export default documentApi;