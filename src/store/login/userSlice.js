import usersApi from '../../api/usersApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const register = createAsyncThunk('users/register', async (data) => {
    const register = await usersApi.register(data);
    return register;
});

export const login = createAsyncThunk('login/user', async (data) => {
    const login = await usersApi.login(data);
    return login;
});

export const loginGoogle = createAsyncThunk('login/loginGoogle', async (data) => {
    const login = await usersApi.loginGoolge(data);
    return login;
});
export const listUserEcommerce = createAsyncThunk('getListUser/user', async () => {
    const list = await usersApi.getListUser();
    return list;
});
export const getAllUserWithPag = createAsyncThunk('getAllUserWithPag/user', async ({ index, size }) => {
    const res = await usersApi.getAllwithPag(index, size);
    return res;
});
export const detailUserEcommerce = createAsyncThunk('getDetailUser/user', async (id) => {
    const detail = await usersApi.getDetailUser(id);
    return detail;
});
export const deteleUser = createAsyncThunk('deleteUser/user', async (id) => {
    const deleteUser = await usersApi.deleteUser(id);
    return deleteUser;
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
        isAuth: access_token === 'undefined' || access_token === null ? false : true,
        myInfo: info || {},
        listUser: [],
        listUserPag: [],
        loading: false,
        detailUser: {},
        listRols: [],
    },
    reducers: {
        setDetailUserEcommerce: (state, action) => {
            state.detailUser = action.payload;
        },
    },
    extraReducers: {
        [listUserEcommerce.pending]: (state) => {
            state.loading = true;
        },
        [listUserEcommerce.rejected]: (state) => {
            state.loading = false;
        },
        [listUserEcommerce.fulfilled]: (state, action) => {
            state.loading = false;
            state.listUser = action.payload;
            // state.total_page = action.payload.data.total_pages;
        },
        [getAllUserWithPag.pending]: (state) => {
            state.loading = true;
        },
        [getAllUserWithPag.rejected]: (state) => {
            state.loading = false;
        },
        [getAllUserWithPag.fulfilled]: (state, action) => {
            state.loading = false;
            state.listUserPag = action.payload.data;
            state.total = action.payload.total_items;
        },
        [detailUserEcommerce.pending]: (state) => {
            state.loading = true;
        },
        [detailUserEcommerce.rejected]: (state) => {
            state.loading = false;
        },
        [detailUserEcommerce.fulfilled]: (state, action) => {
            state.loading = false;
            state.detailUser = action.payload;
            // state.total_page = action.payload.data.total_pages;
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
            // state.total_page = action.payload.data.total_pages;
        },
    },
});
export const { setDetailUserEcommerce } = userSlice.actions;
export default userSlice;
