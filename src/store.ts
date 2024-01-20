import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import taskReducer from './store/taskSlice';

export const store = configureStore({
    reducer: {
      users: userReducer,
      tasks: taskReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
