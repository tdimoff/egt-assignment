import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/userSlice";
import taskReducer from './store/taskSlice';
import postReducer from './store/postSlice';

export const store = configureStore({
    reducer: {
      users: userReducer,
      tasks: taskReducer,
      posts: postReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
