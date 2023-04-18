import { configureStore } from "@reduxjs/toolkit";
import { TodoReducer } from "./TodoSlice";

export const Reducer = configureStore({
    reducer: {
        todos: TodoReducer
    },
});

export type RootState = ReturnType <typeof Reducer.getState>;
export type AppDispatch = typeof Reducer.dispatch;



