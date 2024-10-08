import { configureStore } from '@reduxjs/toolkit';
import planReducer from './features/planSlice';

const store = configureStore({
    reducer: {
        plans: planReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
