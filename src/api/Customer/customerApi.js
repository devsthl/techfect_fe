import axiosClient from '~/api/axiosClient';

const customersApi = {
    async getMyProfile() {
        const url = `customers/me`;
        return axiosClient.get(url);
    },
    async changePassword(data) {
        const url = `/users/change-password`;
        return axiosClient.post(url, data);
    },
    async getCities() {
        const url = `/cities`;
        return axiosClient.get(url);
    },
    async getDistricts(data) {
        const url = `/districts/city/${data}`;
        return axiosClient.get(url);
    },
    async getWards(data) {
        const url = `/wards/district/${data}`;
        return axiosClient.get(url);
    },
    async getAllAddress() {
        const url = `/address/my-address`;
        return axiosClient.get(url);
    },
    async getAddressById(data) {
        const url = `/address/${data}`;
        return axiosClient.get(url);
    },
    async createAddress(data) {
        const url = `/address`;
        return axiosClient.post(url, data);
    },
    async editAddress(id, data) {
        const url = `/address/${id}`;
        return axiosClient.put(url, data);
    },
    async deleteAddress(data) {
        const url = `/address/${data.id}`;
        return axiosClient.delete(url, { data });
    },
    async editProfile(data) {
        const url = `/customers/${data.id}`;
        return axiosClient.put(url, data.data);
    },
};

export default customersApi;
