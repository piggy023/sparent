import { configureStore } from '@reduxjs/toolkit';
import userStore from './userSlice.js';

export default configureStore({
    reducer: {
        user: userStore
    }
})