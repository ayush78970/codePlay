import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../authSlice';

// DOUBT authReducer
export const store=configureStore({
    reducer:{
        auth:authReducer
    }
});