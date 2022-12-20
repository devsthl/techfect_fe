import axiosClient from '~/api/axiosClient';
const CategoriesApi = {
    getAll(ecommerce_id) {
        const url = `/categories?ecommerce_id=${ecommerce_id}`;
        return axiosClient.get(url);
    },
    getTree() {
        const url = `/categories/category-tree`;
        return axiosClient.get(url);
    },
    getForUsingPagination(current, size) {
        const url = `/categories/all-paging?page_index=${current}&page_size=${size}`;
        return axiosClient.get(url);
    },
    getRootTree(id) {
        const url = `/categories/root/${id}`;
        return axiosClient.get(url);
    },
    getById(id) {
        const url = `/categories/${id}`;
        return axiosClient.get(url);
    },
    getChild(id) {
        const url = `/categories?category_id=${id}`;
        return axiosClient.get(url);
    },
    getNewsCategory() {
        const url = `/news-cate`;
        return axiosClient.get(url);
    },
    create(data) {
        const url = `/categories`;
        return axiosClient.post(url, data);
    },
    Edit(edit) {
        const url = `/categories/${edit.id}`;
        return axiosClient.put(url, edit);
    },
    Delete(id) {
        const url = `/categories/${id}`;
        return axiosClient.delete(url);
    },
    getParent(data) {
        const url = `categories/parent/${data}`;
        return axiosClient.get(url);
    },
};
export default CategoriesApi;
