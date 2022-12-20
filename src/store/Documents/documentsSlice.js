import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import documentApi from "~/api/Document/documents.Api";

export const getAllDocuments = createAsyncThunk('getAllDocument', async () => {
    const res = await documentApi.getAll();
    console.log("check documents: ", res);
    return res;
});
export const getAllDocumentsById = createAsyncThunk('getAllDocumentById', async (data) => {
    const res = await documentApi.get(data);
    return res;
});
const documentsSlice = createSlice({
    name: 'documents',
    initialState: {
        documentsList: [],
        documentsListById: [],
        loadingDocuments: false,
        error: '',
    },
    reducers: {},
    extraReducers: {
        [getAllDocuments.pending]: (state, action) => {
            state.loadingDocuments = true;
        },
        [getAllDocuments.rejected]: (state, action) => {
            state.loadingDocuments = false;
        },
        [getAllDocuments.fulfilled]: (state, action) => {
            state.loadingDocuments = false;
            state.documentsList = action.payload;
        },
        [getAllDocumentsById.pending]: (state, action) => {
            state.loadingDocuments = true;
        },
        [getAllDocumentsById.rejected]: (state, action) => {
            state.loadingDocuments = false;
        },
        [getAllDocumentsById.fulfilled]: (state, action) => {
            state.loadingDocuments = false;
            state.documentsListById = action.payload;
        },
    }
})
const { reducer: documentsReducer } = documentsSlice;
export default documentsReducer;