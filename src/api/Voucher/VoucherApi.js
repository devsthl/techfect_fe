import axiosClient from '../axiosClient';

const voucherApi = {
    async getVoucherStore(data) {
        const url = `/vouchers/get-voucher-apply?type=1`;
        return axiosClient.post(url, data);
    },
    async getVoucherAdmin(data) {
        const url = `/vouchers/get-voucher-apply?type=2`;
        return axiosClient.post(url, data);
    },
    async applyVoucherStore(data) {
        const url = `/vouchers/apply-store`;
        return axiosClient.post(url, data);
    },
};

export default voucherApi;
