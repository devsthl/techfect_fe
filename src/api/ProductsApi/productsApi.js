import axiosClient from '~/api/axiosClient';

const productsApi = {
    getAll() {
        const url = `/products`;
        return axiosClient.get(url);
    },
    getForUsingPagination(filter) {
        const url = `/products/all-paging?${filter}`;
        return axiosClient.get(url);
    },
    getProductById(id) {
        const url = `/products/get/${id}`;
        return axiosClient.get(url);
    },
    create(data) {
        const url = `/products`;
        return axiosClient.post(url, data);
    },
    delete(id) {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    edit(edit) {
        const url = `/products/${edit.id}`;
        return axiosClient.put(url, edit);
    },
    getProductByStore(data) {
        const url = `/products/all-paging?store_id=${data.id}&page_index=${data.index}&page_size=${data.size}`;
        return axiosClient.get(url);
    },
};

export default productsApi;
