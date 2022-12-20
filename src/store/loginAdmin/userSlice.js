import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import usersApi from '~/api/usersApi';

export const loginAdmin = createAsyncThunk('login/user', async (data) => {
    const login = await usersApi.login(data);
    return login;
});
export const listUserTechfest = createAsyncThunk('getListUser/user', async () => {
    const list = await usersApi.getListUser();
    return list;
});
export const getRols = createAsyncThunk('getRols/user', async () => {
    const getRols = await usersApi.getRol();
    return getRols;
});

const access_token = localStorage.getItem('access_token');
const info = JSON.parse(localStorage.getItem('info'));

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: access_token === 'underfined' || access_token === null ? false : true,
        myInfo: info || {},
        listUser: [],
        listUserPag: [],
        loading: false,
        detailUser: {},
        listRols: [],
    },
    reducers: {
        setDetailUserTechfest: (state, action) => {
            state.detailUser = action.payload;
        },
    },
    extraReducers: {
        [listUserTechfest.pending]: (state) => {
            state.loading = true;
        },
        [listUserTechfest.rejected]: (state) => {
            state.loading = false;
        },
        [listUserTechfest.fulfilled]: (state, action) => {
            state.loading = false;
            state.listUser = action.payload;
        },
        [getRols.pending]: (state) => {
            state.loading = true;
        },
        [getRols.rejected]: (state) => {
            state.loading = false;
        },
        [getRols.fulfilled]: (state, action) => {
            state.loading = false;
            state.listRols = action.payload;
        },
    },
});

export const { setDetailUserTechfest } = userSlice.actions;
export default userSlice;
