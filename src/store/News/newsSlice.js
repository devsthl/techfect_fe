import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import newsApi from '~/api/NewsApi/newsApi';

export const getAllNews = createAsyncThunk('news/getAllNews', async (data) => {
    const listData = await newsApi.getAllNews(data.index, data.size);
    console.log('listData', listData);
    return listData.data;
});

export const getNewsById = createAsyncThunk('news/getNewsById', async (data) => {
    const listData = await newsApi.getNewsById(data);
    return listData;
});

export const getAllCategoryNews = createAsyncThunk('news/getCategoryNews', async (data) => {
    const listData = await newsApi.getAllCategoryNews();
    return listData;
});

export const getHotNews = createAsyncThunk('news/getHotNews', async (data) => {
    const listData = await newsApi.getHotNews(data);
    return listData;
});

export const getLikeNews = createAsyncThunk('news/getLikeNews', async (data) => {
    const listData = await newsApi.getHotNews(data);
    return listData;
});

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        loading: false,
        listNews: [],
        newsById: [],
        listCategoryNews: [],
        popularEvent: [],
        story: [],
        investment: [],
        listHotNews: [],
        listLikeNews: [],
    },
    reducers: {},
    extraReducers: {
        [getAllNews.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllNews.rejected]: (state, action) => {
            state.loading = false;
        },
        [getAllNews.fulfilled]: (state, action) => {
            state.loading = false;
            state.listNews = action.payload;
            state.popularEvent = action.payload.filter((item) => {
                return item.news_categories.id === 36;
            });
            state.story = action.payload.filter((item) => {
                return item.news_categories.id === 15;
            });
            state.investment = action.payload.filter((item) => {
                return item.news_categories.id === 37;
            });
        },
        [getNewsById.pending]: (state, action) => {
            state.loading = true;
        },
        [getNewsById.rejected]: (state, action) => {
            state.loading = false;
        },
        [getNewsById.fulfilled]: (state, action) => {
            state.loading = false;
            state.newsById = action.payload;
        },
        [getAllCategoryNews.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllCategoryNews.rejected]: (state, action) => {
            state.loading = false;
        },
        [getAllCategoryNews.fulfilled]: (state, action) => {
            state.loading = false;
            state.listCategoryNews = action.payload;
        },
        [getHotNews.pending]: (state, action) => {
            state.loading = true;
        },
        [getHotNews.rejected]: (state, action) => {
            state.loading = false;
        },
        [getHotNews.fulfilled]: (state, action) => {
            state.loading = false;
            state.listHotNews = action.payload;
        },
        [getLikeNews.pending]: (state, action) => {
            state.loading = true;
        },
        [getLikeNews.rejected]: (state, action) => {
            state.loading = false;
        },
        [getLikeNews.fulfilled]: (state, action) => {
            state.loading = false;
            state.listLikeNews = action.payload;
        },
    },
});

const { reducer: newsReducer } = newsSlice;
export default newsReducer;
