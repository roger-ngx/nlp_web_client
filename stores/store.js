import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import datasetReducer from './datasetSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        dataset: datasetReducer
    }
});