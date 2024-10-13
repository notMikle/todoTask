import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import {FilterType, TodolistType} from '@/types.ts';

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: TodolistType[] = [
    { id: todolistId1, title: 'Todo №1', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'completed' },
];

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState,
    reducers: {
        removeTodolist(state, action: PayloadAction<{ todolistId: string }>) {
            return state.filter(t => t.id !== action.payload.todolistId);
        },
        addTodolist(state, action: PayloadAction<{ newTitle: string; todolistId: string }>) {
            const newTodolist: TodolistType = {
                id: action.payload.todolistId,
                title: action.payload.newTitle,
                filter: 'all',
            };
            state.push(newTodolist);

        },
        changeTodolistTitle(state, action: PayloadAction<{ todolistId: string; newTitle: string }>) {
            const todolist = state.find(t => t.id === action.payload.todolistId);
            if (todolist) {
                todolist.title = action.payload.newTitle;
            }
        },
        changeTodolistFilter(state, action: PayloadAction<{ todolistId: string; newFilter: FilterType }>) {
            const todolist = state.find(t => t.id === action.payload.todolistId);
            if (todolist) {
                todolist.filter = action.payload.newFilter;
            }
        },
    },

});

export const { removeTodolist, addTodolist, changeTodolistTitle, changeTodolistFilter } = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;
