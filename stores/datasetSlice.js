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