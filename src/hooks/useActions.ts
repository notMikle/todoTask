import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';
import { addTodolist, changeTodolistFilter, changeTodolistTitle, removeTodolist } from '../state/todolists-reducer';
import { addTask, changeTaskStatus, changeTaskTitle, removeTask } from '../state/tasks-reducer';
import { FilterType } from '../types';

export const useActions = () => {
    const dispatch = useDispatch();

    const handleAddTodolist = useCallback((title: string) => {
        dispatch(addTodolist({ newTitle: title, todolistId: v1() }));
    }, [dispatch]);

    const handleRemoveTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolist({ todolistId }));
    }, [dispatch]);

    const handleChangeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitle({ todolistId, newTitle: title }));
    }, [dispatch]);

    const handleChangeFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilter({ todolistId, newFilter: filter }));
    }, [dispatch]);

    const handleRemoveTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTask({ todolistId, taskId }));
    }, [dispatch]);

    const handleAddTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTask({ todolistId, title }));
    }, [dispatch]);

    const handleChangeTaskStatus = useCallback((todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatus({ todolistId, taskId, isDone }));
    }, [dispatch]);

    const handleChangeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitle({ todolistId, taskId, title }));
    }, [dispatch]);

    return {
        handleAddTodolist,
        handleRemoveTodolist,
        handleChangeTodolistTitle,
        handleChangeFilter,
        handleRemoveTask,
        handleAddTask,
        handleChangeTaskStatus,
        handleChangeTaskTitle
    };
};
