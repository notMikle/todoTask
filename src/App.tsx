import React from 'react';
import { Todolist } from './components/Todolist';
import { AddItemForm } from './components/AddItemForm';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import {TasksStateType, TodolistType} from '@/types.ts';
import {useActions} from '@/hooks/useActions.ts';
import { ListTodo } from 'lucide-react';

export const App = () => {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const {
        handleAddTodolist,
        handleRemoveTodolist,
        handleChangeTodolistTitle,
        handleChangeFilter,
        handleRemoveTask,
        handleAddTask,
        handleChangeTaskStatus,
        handleChangeTaskTitle
    } = useActions();


    return (
        <>
            <header className='py-4 px-7 bg-gray-50 flex items-center gap-3'>
                <ListTodo/>
                <div className='font-bold'>TodoList</div>
            </header>
            <div className='my-4 mx-5 flex flex-col gap-4 '>
                <div className='w-[250px]'>
                    <AddItemForm addTask={handleAddTodolist} placeholder={'Add new todolist'} />
                </div>
                <div className='flex gap-4 flex-wrap'>
                    {todolists.map(todolist => {
                        const filteredTasks = tasks[todolist.id] || [];

                        return (
                            <div className='inline-block' key={todolist.id}>
                                <Todolist
                                    id={todolist.id}
                                    title={todolist.title}
                                    tasks={filteredTasks}
                                    removeTodolist={handleRemoveTodolist}
                                    changeTodolistTitle={handleChangeTodolistTitle}
                                    removeTask={handleRemoveTask}
                                    changeFilter={handleChangeFilter}
                                    addTask={handleAddTask}
                                    changeTaskStatus={handleChangeTaskStatus}
                                    changeTaskTitle={handleChangeTaskTitle}
                                    filter={todolist.filter}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
