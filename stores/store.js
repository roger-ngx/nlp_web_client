import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from "./userSlice";
import datasetReducer from './datasetSlice';

const persistConfig = {
    key: 'root',
    storage
};

const reducers = combineReducers({
    user: userReducer,
    dataset: datasetReducer
});


const persistedReducer = persistReducer(persistConfig, reducers);

export const store =  configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);

