import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import customersApi from '~/api/Customer/customerApi';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getMyProfile = createAsyncThunk('customers/me', async () => {
    const listData = await customersApi.getMyProfile();
    return listData;
});

export const editMyProfile = createAsyncThunk('customers/editProfile', async (data, thunkAPI) => {
    const listData = await customersApi.editProfile(data);
    if (listData.message !== 'error') {
        message.success('Cập nhật thông tin cá nhân thành công');
        thunkAPI.dispatch(getMyProfile());
    } else {
        message.error('Có lỗi xảy ra');
    }
});

export const changePassword = createAsyncThunk('users/changepassword', async (data, thunkAPI) => {
    const res = await customersApi.changePassword(data);
    console.log('res', res.errors === 'USER_PASSWORD_INVALID');

    return res;
});

export const getAllCities = createAsyncThunk('address/cities', async () => {
    const listCities = await customersApi.getCities();
    return listCities;
});

export const getDistrictsById = createAsyncThunk('address/district', async (data) => {
    const listDistricts = await customersApi.getDistricts(data);
    return listDistricts;
});

export const getWardsById = createAsyncThunk('address/wards', async (data) => {
    const listWards = await customersApi.getWards(data);
    return listWards;
});

export const getAllAddress = createAsyncThunk('address/all-address', async () => {
    const listData = await customersApi.getAllAddress();
    return listData;
});

export const getAddressById = createAsyncThunk('address/address-by-id', async (data) => {
    const dataAddress = await customersApi.getAddressById(data);
    return dataAddress;
});

export const createAddress = createAsyncThunk('address/create-address', async (data, thunkAPI) => {
    const res = await customersApi.createAddress(data);
    thunkAPI.dispatch(getAllAddress());
    message.success('Tạo địa chỉ thành công');
});

export const deleteAddress = createAsyncThunk('address/delete-address', async (data, thunkAPI) => {
    await customersApi.deleteAddress(data);
    thunkAPI.dispatch(getAllAddress());
});

export const editAddress = createAsyncThunk('customers/editAddress', async (data, thunkAPI) => {
    const listData = await customersApi.editAddress(data.id, data.data);

    if (listData.message !== 'error') {
        message.success('Cập nhật thông tin cá nhân thành công');
        thunkAPI.dispatch(getAllAddress());
    }
});

export const setDataWard = createAsyncThunk('customer/setDataWard', async () => {
    return [];
});

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        loading: false,
        myProfile: [],
        allCities: [],
        listDistricts: [],
        listWards: [],
        listAddress: [],
        addressById: [],
        message: '',
    },
    reducers: {},
    extraReducers: {
        [getMyProfile.pending]: (state) => {
            state.loading = true;
        },
        [getMyProfile.rejected]: (state) => {
            state.loading = false;
        },
        [getMyProfile.fulfilled]: (state, action) => {
            state.loading = false;
            state.myProfile = action.payload;
        },

        [getAllCities.pending]: (state) => {
            state.loading = true;
        },
        [getAllCities.rejected]: (state) => {
            state.loading = false;
        },
        [getAllCities.fulfilled]: (state, action) => {
            state.loading = false;
            state.allCities = action.payload;
        },

        [getDistrictsById.pending]: (state) => {
            state.loading = true;
        },
        [getDistrictsById.rejected]: (state) => {
            state.loading = false;
        },
        [getDistrictsById.fulfilled]: (state, action) => {
            state.loading = false;
            state.listDistricts = action.payload;
        },

        [getWardsById.pending]: (state) => {
            state.loading = true;
        },
        [getWardsById.rejected]: (state) => {
            state.loading = false;
        },
        [getWardsById.fulfilled]: (state, action) => {
            state.loading = false;
            state.listWards = action.payload;
        },

        [getAllAddress.pending]: (state) => {
            state.loading = true;
        },
        [getAllAddress.rejected]: (state) => {
            state.loading = false;
        },
        [getAllAddress.fulfilled]: (state, action) => {
            state.loading = false;
            state.listAddress = action.payload;
        },

        [getAddressById.pending]: (state) => {
            state.loading = true;
        },
        [getAddressById.rejected]: (state) => {
            state.loading = false;
        },
        [getAddressById.fulfilled]: (state, action) => {
            state.loading = false;
            state.addressById = action.payload;
        },
        [changePassword.pending]: (state) => {
            state.loading = true;
        },
        [changePassword.rejected]: (state) => {
            state.loading = false;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload;
        },
        [setDataWard.fulfilled]: (state, action) => {
            state.loading = false;
            state.listWards = action.payload;
        },
    },
});

const { reducer: customerReducer } = customerSlice;
export default customerReducer;
