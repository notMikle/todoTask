import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v1 } from 'uuid';
import {todolistId1, todolistId2 } from './todolists-reducer';

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TasksStateType = {
    [key: string]: TaskType[];
};

const initialState: TasksStateType = {
    [todolistId1]: [
        { id: v1(), title: 'ДаблКлик-изменить', isDone: true },
        { id: v1(), title: 'Активная таска', isDone: false },
        { id: v1(), title: 'Неактивная', isDone: true },
        { id: v1(), title: 'Redux', isDone: false },
        { id: v1(), title: 'React', isDone: false },
    ],
    [todolistId2]: [
        { id: v1(), title: 'Book', isDone: true },
        { id: v1(), title: 'Milk', isDone: true },
        { id: v1(), title: 'Bread', isDone: false },
        { id: v1(), title: 'Mango', isDone: false },
        { id: v1(), title: 'Bananas', isDone: false },
        { id: v1(), title: 'Peaches', isDone: false },
    ],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{ todolistId: string; taskId: string }>) {
            const { todolistId, taskId } = action.payload;
            const tasks = state[todolistId];
            state[todolistId] = tasks.filter(task => task.id !== taskId);
        },
        addTask(state, action: PayloadAction<{ todolistId: string; title: string }>) {
            const { todolistId, title } = action.payload;
            const newTask = { id: v1(), title, isDone: false };
            if (!state[todolistId]) {
                state[todolistId] = [];
            }
            state[todolistId] = [newTask, ...state[todolistId]];
        },
        changeTaskStatus(state, action: PayloadAction<{ todolistId: string; taskId: string; isDone: boolean }>) {
            const { todolistId, taskId, isDone } = action.payload;
            const tasks = state[todolistId];
            state[todolistId] = tasks.map(task =>
                task.id === taskId ? { ...task, isDone } : task
            );
        },
        changeTaskTitle(state, action: PayloadAction<{ todolistId: string; taskId: string; title: string }>) {
            const { todolistId, taskId, title } = action.payload;
            const tasks = state[todolistId];
            state[todolistId] = tasks.map(task =>
                task.id === taskId ? { ...task, title } : task
            );
        },
    },
});

export const { removeTask, addTask, changeTaskStatus, changeTaskTitle,  } = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
