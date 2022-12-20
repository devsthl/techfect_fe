import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import enterpriseApi from '~/api/Enterprise/EnterpriseApi';

export const getAllEnterprise = createAsyncThunk('getAllEnterprise', async () => {
    const res = await enterpriseApi.getAll();
    console.log('All enterprise', res);
    return res;
});

export const getAllEnterpriseById = createAsyncThunk('getAllEnterpriseById', async (data) => {
    const res = await enterpriseApi.get(data);
    return res;
});

const enterpriseSlice = createSlice({
    name: 'enterprise',
    initialState: {
        enterpriseList: [],
        enterpriseListById: [],
        loadingEnterprise: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getAllEnterprise.pending]: (state, action) => {
            state.loadingEnterprise = true;
        },
        [getAllEnterprise.rejected]: (state, action) => {
            state.loadingEnterprise = false;
        },
        [getAllEnterprise.fulfilled]: (state, action) => {
            state.loadingEnterprise = false;
            state.enterpriseList = action.payload.data;
        },
        [getAllEnterpriseById.pending]: (state, action) => {
            state.loadingEnterprise = true;
        },
        [getAllEnterpriseById.rejected]: (state, action) => {
            state.loadingEnterprise = false;
        },
        [getAllEnterpriseById.fulfilled]: (state, action) => {
            state.loadingEnterprise = false;
            state.enterpriseListById = action.payload;
        },
    }
});
const { reducer: enterpriseReducer } = enterpriseSlice;
export default enterpriseReducer;
