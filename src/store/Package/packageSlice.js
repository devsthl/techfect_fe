import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import packageApi from '~/api/Package/packageApi';

export const getAllPackage = createAsyncThunk('cart/getAllPackage', async () => {
    const listData = await packageApi.getAllPackage();
    return listData;
});

const packageSlice = createSlice({
    name: 'package',
    initialState: {
        loading: false,
        listPackage: [],
    },
    reducers: {},
    extraReducers: {
        [getAllPackage.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllPackage.rejected]: (state, action) => {
            state.loading = false;
        },
        [getAllPackage.fulfilled]: (state, action) => {
            state.loading = false;
            state.listPackage = action.payload;
        },
    },
});

const { reducer: packageReducer } = packageSlice;
export default packageReducer;
