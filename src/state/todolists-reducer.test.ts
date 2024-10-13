import { v1 } from 'uuid';
import {
    addTodolist, changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist,
    todolistsReducer
} from './todolists-reducer';

import { FilterType, TodolistType } from '@/types';

let todolistId1: string;
let todolistId2: string;
let startState: TodolistType[];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];
});

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolist({ todolistId: todolistId1 }));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const newTodolistTitle = 'newTodolistTitle';

    const endState = todolistsReducer(startState, addTodolist({ newTitle: newTodolistTitle, todolistId: v1() }));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change title', () => {
    const newTodolistTitle = 'newTodolistTitle';

    const endState = todolistsReducer(startState, changeTodolistTitle({ todolistId: todolistId2, newTitle: newTodolistTitle }));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter should be changed', () => {
    const newFilter: FilterType = 'completed';

    const endState = todolistsReducer(startState, changeTodolistFilter({ todolistId: todolistId2, newFilter: newFilter }));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});
