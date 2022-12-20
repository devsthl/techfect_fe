import axiosClient from './axiosClient';

const eventsApi = {
    getAll() {
        const url = `/events`;
        return axiosClient.get(url);
    },
    async getAllwithPag(type, index, size) {
        const url = `/events/all-paging?type=${type}&page_index=${index}&page_size=${size}`;
        return axiosClient.get(url);
    },
    async getAllwithPag2(index, size) {
        const url = `/events/all-paging?page_index=${index}&page_size=${size}`;
        return axiosClient.get(url);
    },
    async registerEvent(data) {
        const url = `/bookings`;
        return axiosClient.post(url, data);
    },
    async getListEventConfirm(status, index, size, type, event_id) {
        const url = `/trade-promotion/confirm-all-paging?status=${status}&page_index=${index}&page_size=${size}&type=${type}&event_id=${event_id}`;
        return axiosClient.get(url);
    },
    async confirmUser(id) {
        const url = `/trade-promotion/confirm/${id}`;
        return axiosClient.post(url);
    },
    async deleteUserConfirm(id) {
        const url = `/trade-promotion/${id}`;
        return axiosClient.delete(url);
    },
    get(id) {
        const url = `/events/${id}`;
        return axiosClient.get(url);
    },
    create(data) {
        const url = `/events`;
        return axiosClient.post(url, data);
    },
    edit(edit) {
        const url = `/events/${edit.id}`;
        return axiosClient.put(url, edit);
    },
    delete(id) {
        const url = `/events/${id}`;
        return axiosClient.delete(url);
    },
};
export default eventsApi;
