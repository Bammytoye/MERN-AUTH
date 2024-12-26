import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './User/UserSlice';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer})

const persistConfig = {
    key: 'MernAuth',
    version: 1,
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const Store = configureStore({
    reducer: persistedReducer,
    middleware:(getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false, // disable this if you are using redux-persist
    }) 
})

export const persistor = persistStore(Store)