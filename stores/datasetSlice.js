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
export const fetchDatasetItems = (userId, projectId) => {
    return async (dispatch) => {
        try{
            const data = {userId, projectId};

            const res = await fetch('http://localhost:8051/api/file', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resData = await res.json();

            console.log(resData);

            dispatch(setDataset(resData.data || []));
        }catch(ex){
            console.log(ex);
        }
    };
};