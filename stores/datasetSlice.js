import { createSlice } from "@reduxjs/toolkit";

export const datasetSlice = createSlice({
    name: 'dataset',
    initialState: {
        value: {}
    },
    reducers: {
        setDataset: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { setDataset } = datasetSlice.actions;

export const selectDataset = state => state.value;

export default datasetSlice.reducer;


//redux-thunk
export const fetchDatasetItems = (userId) => {
    return async (dispatch) => {
        const res = await fetch('http://localhost:3001/api/file/'+userId);
        const data = await res.json();

        dispatch(setDataset(data.data));
    };
};