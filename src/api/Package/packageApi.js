import axiosClient from '../axiosClient';

const packageApi = {
    async getAllPackage(data) {
        const url = `/cooperation-package/`;
        return axiosClient.get(url, data);
    },
    async registerPackage(data) {
        const url = `/order-cooperation-package/`;
        return axiosClient.post(url, data);
    },
    async getPackageRegistered() {
        const url = `order-cooperation-package/info/get-by-userid`;
        return axiosClient.get(url);
    },
    async changePackage(data) {
        const url = `/order-cooperation-package/change-cooperationpackage`;
        return axiosClient.put(url, data);
    },
};

export default packageApi;
