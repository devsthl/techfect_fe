import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import likesApi from '~/api/Likes/likesApi';
import { getAllProduct, getProductById } from '../Products/productsSlice';

export const onLike = createAsyncThunk('like/onLike', async (data, thunkAPI) => {
    const res = await likesApi.like(data);
    thunkAPI.dispatch(getAllProduct());
    return res;
});

export const onLikeProductDetail = createAsyncThunk('like/onLike', async (data, thunkAPI) => {
    const res = await likesApi.like(data);
    thunkAPI.dispatch(getProductById(data.product_id));
    return res;
});

export const getLikeProduct = createAsyncThunk('like/getLikeProduct', async () => {
    const res = await likesApi.getLikeProduct();
    return res;
});

const likeSlice = createSlice({
    name: 'like',
    initialState: {
        listLikeProduct: [],
        likeMessage: '',
        loadingLike: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getLikeProduct.pending]: (state, action) => {
            state.loadingLike = true;
        },
        [getLikeProduct.rejected]: (state, action) => {
            state.loadingLike = false;
        },
        [getLikeProduct.fulfilled]: (state, action) => {
            state.loadingLike = false;
            state.listLikeProduct = action.payload;
        },
        [onLike.pending]: (state, action) => {
            state.loadingLike = true;
        },
        [onLike.rejected]: (state, action) => {
            state.loadingLike = false;
        },
        [onLike.fulfilled]: (state, action) => {
            state.loadingLike = false;
            if (action.payload.message === 'error') {
                message.error('Có lỗi xảy ra');
            }
            if (action.payload.noti.type === 0) {
                message.success('Thêm sản phẩm vào danh sách yêu thích');
            }
            if (action.payload.noti.type === 1) {
                message.success('Đã bỏ yêu thích sản phẩm');
            }
        },
    },
});
const { reducer: likeReducer } = likeSlice;
export default likeReducer;
