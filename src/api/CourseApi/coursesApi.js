import axiosClient from '../axiosClient';

const coursesApi = {
    async getAllCourses(index, size) {
        const url = `/course/all-paging/?type=2&page_index=${index}&page_size=${size}`;
        return axiosClient.get(url);
    },
    async getCourseById(data) {
        const url = `/course/${data}`;
        return axiosClient.get(url);
    },
    async registerForMultiPeople(data) {
        const url = `/bookings`;
        return axiosClient.post(url, data);
    },
    async createCourse(data) {
        const url = `/course`;
        return axiosClient.post(url, data);
    },
    async getListUserConfirm(data) {
        const url = `trade-promotion/list-confirm-and-unconfirm?course=${data.course_id}&status=${data.status}`;
        return axiosClient.get(url);
    },
    async confirmUser(data) {
        const url = `/trade-promotion/confirm-member`;
        return axiosClient.put(url, data);
    },
    async deleteUserConfirm(id) {
        const url = `/trade-promotion/${id}`;
        return axiosClient.delete(url);
    },
    async getFavoriteCourse() {
        const url = `likes/`;
        return axiosClient.get(url);
    },
    async loveCourse(data) {
        const url = `likes/`;
        return axiosClient.post(url, data);
    },
};

export default coursesApi;
