import { createSlice, PayloadAction,
    createAsyncThunk } from "@reduxjs/toolkit";
import { ITodo, ITodoState } from "../models/Interfaces";
const URL = "https://jsonplaceholder.typicode.com/todos";

export const getAllTodos = createAsyncThunk("todos/fetchAll", 
async () => {
    const res: Response = await fetch(URL);
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return [...data];
});

const initialState: ITodoState = {
    todos: [],
    todosPerPage: 10,
    currentPage: 1,
    loading: false,
    error: null
};

const TodoSlice = createSlice({
    name: "todos",
    initialState: initialState,
    reducers: {
        onNavigateNext: (state) => {
            state.currentPage++;
        },
        onNavigatePrev: (state) => {
            state.currentPage--;
        },
        onChangeTodosPerpage: (
            state, action: PayloadAction<number>
        ) => {
            state.todosPerPage = action.payload
        },
        onClickCurrentPage: (
            state, action: PayloadAction<number>
        ) => {
            state.currentPage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTodos.rejected.toString(), 
        (state, action: PayloadAction<ITodoState>) => {
            state.loading = false,
            state.error = action.payload.error
        });
        builder.addCase(getAllTodos.pending, 
        (state) => {
            state.error = null,
            state.loading = true
        });
        builder.addCase(getAllTodos.fulfilled.type, 
        (state, action: PayloadAction<ITodo[]>) => {
            state.loading = false,
            state.todos = [...action.payload]
        });
    },
});

export const TodoActions = TodoSlice.actions;
export const TodoReducer = TodoSlice.reducer;





