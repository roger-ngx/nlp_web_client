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
        try{
            const res = await fetch('http://localhost:8051/api/file/'+userId);
            const data = await res.json();

            console.log(data);

            dispatch(setDataset(data.data || []));
        }catch(ex){
            console.log(ex);
        }
    };
};