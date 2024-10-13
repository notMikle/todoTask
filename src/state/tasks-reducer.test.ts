import { tasksReducer } from './tasks-reducer';
import { addTask, changeTaskStatus, changeTaskTitle, removeTask } from '../state/tasks-reducer';
import {TasksStateType} from '@/types';

let startState: TasksStateType;

beforeEach(() => {
    startState = {
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '2', title: 'milk', isDone: true },
            { id: '3', title: 'tea', isDone: false }
        ]
    };
});

test('correct task should be deleted from correct array', () => {
    const action = removeTask({todolistId:'todolistId2', taskId:'2'});

    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        'todolistId1': [
            { id: '1', title: 'CSS', isDone: false },
            { id: '2', title: 'JS', isDone: true },
            { id: '3', title: 'React', isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: 'bread', isDone: false },
            { id: '3', title: 'tea', isDone: false }
        ]
    });

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(2);
});

test('correct task should be added to correct array', () => {
    const action = addTask({todolistId:'todolistId2', title:'juice'});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juice');
    expect(endState['todolistId2'][0].isDone).toBe(false);
});

test('status of specified task should be changed', () => {
    const action = changeTaskStatus({todolistId:'todolistId2', taskId:'2', isDone:false});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].isDone).toBe(false);
    expect(endState['todolistId1'][1].isDone).toBe(true);
});

test('title of specified task should be changed', () => {
    const action = changeTaskTitle({todolistId:'todolistId2', taskId:'2', title:'water'});

    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe('water');
    expect(endState['todolistId1'][1].title).toBe('JS');
});
