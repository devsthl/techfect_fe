import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CategoriesApi from '~/api/CategoryApi/categoriesApi';

export const getTreeCategory = createAsyncThunk('categories/getTreeCategory', async () => {
    const tree_category = await CategoriesApi.getTree();
    return tree_category;
});

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        categoryList: [],
        tree_category: [],
        loadingCategory: false,
        loadingTree: false,
        error: '',
        ecommerce_id: 0,
        categoryListWithPagination: {
            data: [],
        },
        loadingCategoryListWithPagination: false,
    },
    reducers: {},
    extraReducers: {
        // [getAllCategory.pending]: (state, action) => {
        //     state.loadingCategory = true;
        // },
        // [getAllCategory.rejected]: (state, action) => {
        //     state.loadingCategory = false;
        // },
        // [getAllCategory.fulfilled]: (state, action) => {
        //     state.loadingCategory = false;
        //     state.categoryList = action.payload;
        // },
        [getTreeCategory.pending]: (state, action) => {
            state.loadingTree = true;
        },
        [getTreeCategory.rejected]: (state, action) => {
            state.loadingTree = false;
        },
        [getTreeCategory.fulfilled]: (state, action) => {
            state.loadingTree = false;
            state.tree_category = action.payload;
        },
        // [getAllCategoryPaging.pending]: (state, action) => {
        //     state.loadingCategoryListWithPagination = true;
        // },
        // [getAllCategoryPaging.rejected]: (state, action) => {
        //     state.loadingCategoryListWithPagination = false;
        // },
        // [getAllCategoryPaging.fulfilled]: (state, action) => {
        //     state.loadingCategoryListWithPagination = false;
        //     state.categoryListWithPagination = action.payload;
        // },
    },
});

const { reducer: categoryReducer } = categorySlice;
export default categoryReducer;
