import axiosClient from '../axiosClient';

const onePayApi = {
    async checkoutOnePay(data) {
        const url = `/onepay/checkout-v2`;
        return axiosClient.post(url, data);
    },
    async checkTransaction(data) {
        const url = `/bookings/check-transaction_id`;
        return axiosClient.post(url, data);
    },
    async checkTransactionPackage(data) {
        const url = `/order-cooperation-package/check-transaction_id`;
        return axiosClient.post(url, data);
    },
};

export default onePayApi;
