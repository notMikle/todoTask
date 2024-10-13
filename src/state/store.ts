import {configureStore} from '@reduxjs/toolkit';
import {tasksReducer} from '@/state/tasks-reducer.ts';
import {todolistsReducer} from '@/state/todolists-reducer.ts';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
    },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;