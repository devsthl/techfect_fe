import axiosClient from '../axiosClient';

const storeApi = {
    async getAllField() {
        const url = `/fields`;
        return axiosClient.get(url);
    },
    async getAllStoreByField(data) {
        const url = `/stores/all-paging?page_index=1&page_size=4&field_id=${data}`;
        return axiosClient.get(url);
    },
    async getAllStore() {
        const url = `/stores`;
        return axiosClient.get(url);
    },
    async getStoreAllPaging(data, body) {
        console.log('body', body);
        let urlString = '';
        if (body === undefined) {
            urlString = '';
        }
        if (body.city_id !== '' && body.field_id === '' && body.name === '') {
            urlString = `&city_id=${body.city_id}`;
        }
        if (body.city_id === '' && body.field_id !== '' && body.name === '') {
            urlString = `&field_id=${body.field_id}`;
        }
        if (body.city_id === '' && body.field_id === '' && body.name !== '') {
            urlString = `&name=${body.name}`;
        }
        console.log(12313123);
        if (body.city_id !== '' && body.field_id !== '' && body.name === '') {
            urlString = `&city_id=${body.city_id}&field_id=${body.field_id}`;
        }
        if (body.city_id !== '' && body.field_id === '' && body.name !== '') {
            urlString = `&city_id=${body.city_id}&name=${body.name}`;
        }
        if (body.city_id === '' && body.field_id !== '' && body.name !== '') {
            urlString = `&field_id=${body.field_id}&name=${body.name}`;
        }
        if (body.city_id !== '' && body.field_id !== '' && body.name !== '') {
            urlString = `&city_id=${body.city_id}&field_id=${body.field_id}&name=${body.name}`;
        }
        console.log('urlString', urlString);
        const url = `/stores/all-paging?page_index=${data.index}&page_size=${data.size}${urlString}`;
        return axiosClient.get(url);
    },
    async createField(data) {
        const url = `/fields`;
        return axiosClient.post(url, data);
    },
    async createStore(data) {
        const url = `/stores`;
        return axiosClient.post(url, data);
    },
    async getMyStore() {
        const url = `/stores/my-store`;
        return axiosClient.get(url);
    },
};

export default storeApi;
