import { configureStore } from '@reduxjs/toolkit';
import projectSlice from './projectSlice';
import AppSlice from './appSlice';
import authSlice from './authSlice';

export const store = configureStore({
    reducer : {
        projectsReducer : projectSlice,
        appReducer : AppSlice,
        authReducer : authSlice
    }
})



