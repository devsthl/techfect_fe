import axiosClient from '../axiosClient';

const newsApi = {
    async getAllCategoryNews() {
        const url = `/news-cate`;
        return axiosClient.get(url);
    },
    async createNews(data) {
        const url = `/news`;
        return axiosClient.post(url, data);
    },
    async getAllNews(index, size) {
        const url = `/news/all-paging?page_size=${size}&page_index=${index}`;
        return axiosClient.get(url);
    },
    async getNewsById(data) {
        const url = `/news/${data}`;
        return axiosClient.get(url);
    },
    async edit(id, data) {
        const url = `/news/${id}`;
        return axiosClient.put(url, data);
    },
    async getHotNews(data) {
        const url = `/news/hot-new/all?limit=${data}`;
        return axiosClient.get(url);
    },
    async getLikeNews(data) {
        const url = `/news/news-likes/new?limit=${data}`;
        return axiosClient.get(url);
    },
};

export default newsApi;
