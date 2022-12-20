import axiosClient from '../axiosClient';

const CartApi = {
    async addToCart(data) {
        const url = `/cart`;
        return axiosClient.post(url, data);
    },
    async getAllCart() {
        const url = `/cart`;
        return axiosClient.get(url);
    },
    async checkoutCart(data) {
        const url = `/orders/count-price`;
        return axiosClient.post(url, data);
    },
    async updateQuantity(data, id) {
        const url = `/cart/${id}`;
        return axiosClient.put(url, data);
    },
    async deleteProductInCart(data) {
        const url = `cart`;
        return axiosClient.delete(url, { data });
    },
    async getShipFee(data) {
        const url = `/orders/fee`;
        return axiosClient.post(url, data);
    },
};

export default CartApi;
