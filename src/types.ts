export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TasksStateType = {
    [key: string]: TaskType[];
};

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string;
    title: string;
    filter: FilterType;
};
