import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventsApi from '~/api/eventsApi';
import { message } from 'antd';

export const getAllEvents = createAsyncThunk('events/getAllEvents', async () => {
    const res = await eventsApi.getAll();
    return res;
});
export const getAllEventsWithPag = createAsyncThunk('events/getAllEventWithPag', async ({ type, index, size }) => {
    const res = await eventsApi.getAllwithPag(type, index, size);
    return res;
});
export const getAllEventsWithPag2 = createAsyncThunk('events/getAllEventWithPag2', async ({ index, size }) => {
    const res = await eventsApi.getAllwithPag2(index, size);
    return res;
});
export const getListEventConfirmm = createAsyncThunk(
    'events/getListEventConfirmm',
    async ({ status, index, size, type, event_id }) => {
        const res = await eventsApi.getListEventConfirm(status, index, size, type, event_id);
        console.log('list', res);
        return res;
    },
);
export const confirmUser = createAsyncThunk('event/confirmUser', async (data, thunkAPI) => {
    const listData = await eventsApi.confirmUser(data);
    if (listData.message === 'error') {
        message.error('Xác nhận không thành công');
    } else {
        message.success('Xác nhận thành công');
        thunkAPI.dispatch(getListEventConfirmm(0));
    }
});

export const deleteUser = createAsyncThunk('event/deleteUser', async (data, thunkAPI) => {
    const listData = await eventsApi.deleteUserConfirm(data);
    if (listData.message === 'error') {
        message.error('Xóa không thành công');
    } else {
        thunkAPI.dispatch(getListEventConfirmm(0));
        message.success('Xóa người đăng ký thành công');
    }
});
const eventSlice = createSlice({
    name: 'events',
    initialState: {
        eventList: [],
        eventListPag: [],
        eventListPag2: [],
        listEventConfirm: [],
        loadingEvent: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getAllEvents.pending]: (state, action) => {
            state.loadingEvent = true;
        },
        [getAllEvents.rejected]: (state, action) => {
            state.loadingEvent = false;
        },
        [getAllEvents.fulfilled]: (state, action) => {
            state.loadingEvent = false;
            state.eventList = action.payload;
        },
        [getAllEventsWithPag.pending]: (state, action) => {
            state.loadingEvent = true;
        },
        [getAllEventsWithPag.rejected]: (state, action) => {
            state.loadingEvent = false;
        },
        [getAllEventsWithPag.fulfilled]: (state, action) => {
            state.loadingEvent = false;
            state.eventListPag = action.payload.data;
            state.total = action.payload.total_items;
        },
        [getAllEventsWithPag2.pending]: (state, action) => {
            state.loadingEvent = true;
        },
        [getAllEventsWithPag2.rejected]: (state, action) => {
            state.loadingEvent = false;
        },
        [getAllEventsWithPag2.fulfilled]: (state, action) => {
            state.loadingEvent = false;
            state.eventListPag2 = action.payload.data;
            state.total = action.payload.total_items;
        },
        [getListEventConfirmm.pending]: (state, action) => {
            state.loadingEvent = true;
        },
        [getListEventConfirmm.rejected]: (state, action) => {
            state.loadingEvent = false;
        },
        [getListEventConfirmm.fulfilled]: (state, action) => {
            state.loadingEvent = false;
            state.listEventConfirm = action.payload.data;
        },
        [confirmUser.pending]: (state, action) => {
            state.loadingEvent = true;
        },
        [confirmUser.rejected]: (state, action) => {
            state.loadingEvent = false;
        },
        [confirmUser.fulfilled]: (state, action) => {
            state.loadingEvent = false;
            state.listEventConfirm = action.payload.data;
        },
        [deleteUser.pending]: (state, action) => {
            state.loadingEvent = true;
        },
        [deleteUser.rejected]: (state, action) => {
            state.loadingEvent = false;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loadingEvent = false;
        },
    },
});
const { reducer: eventReducer } = eventSlice;
export default eventReducer;
