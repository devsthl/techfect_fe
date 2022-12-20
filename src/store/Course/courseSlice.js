import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import { useState } from 'react';
import coursesApi from '~/api/CourseApi/coursesApi';

export const getAllCourse = createAsyncThunk('course/getAllCourse', async () => {
    const listData = await coursesApi.getAllCourses(1, 9);
    return listData.data;
});

export const getListConfirm = createAsyncThunk('course/getUserConfirm', async (data) => {
    const listData = await coursesApi.getListUserConfirm(data);
    return listData;
});

export const confirmUser = createAsyncThunk('course/confirmUser', async (data, thunkAPI) => {
    const listData = await coursesApi.confirmUser(data.data);
    if (listData.message === 'error') {
        message.error('Xác nhận không thành công');
    } else {
        message.success('Xác nhận thành công');
        thunkAPI.dispatch(
            getListConfirm({
                status: 0,
                course_id: data.course_id,
            }),
        );
    }
});

export const getCourseById = createAsyncThunk('course/getCourseById', async (data) => {
    const res = await coursesApi.getCourseById(data);
    return res;
});

export const deleteUser = createAsyncThunk('course/deleteUser', async (data, thunkAPI) => {
    const listData = await coursesApi.deleteUserConfirm(data.id);
    if (listData.message === 'error') {
        message.error('Xóa không thành công');
    } else {
        thunkAPI.dispatch(
            getListConfirm({
                status: 0,
                course_id: data.course_id,
            }),
        );
        message.success('Xóa người đăng ký thành công');
    }
});

const courseSlice = createSlice({
    name: 'course',
    initialState: {
        loading: false,
        listCourses: [],
        listUserConfirm: [],
        courseById: {},
    },
    reducers: {},
    extraReducers: {
        [getAllCourse.pending]: (state, action) => {
            state.loading = true;
        },
        [getAllCourse.rejected]: (state, action) => {
            state.loading = false;
        },
        [getAllCourse.fulfilled]: (state, action) => {
            state.loading = false;
            state.listCourses = action.payload;
        },
        [getListConfirm.pending]: (state, action) => {
            state.loading = true;
        },
        [getListConfirm.rejected]: (state, action) => {
            state.loading = false;
        },
        [getListConfirm.fulfilled]: (state, action) => {
            state.loading = false;
            state.listUserConfirm = action.payload;
        },
        [deleteUser.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteUser.rejected]: (state, action) => {
            state.loading = false;
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [getCourseById.pending]: (state, action) => {
            state.loading = true;
        },
        [getCourseById.rejected]: (state, action) => {
            state.loading = false;
        },
        [getCourseById.fulfilled]: (state, action) => {
            state.loading = false;
            state.courseById = action.payload;
        },
    },
});

const { reducer: courseReducer } = courseSlice;
export default courseReducer;
