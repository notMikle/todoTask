import React from 'react'
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import { Trash2 } from 'lucide-react';
import {Task} from './Task';
import {Button} from '@/components/ui/button';
import {FilterType, TaskType} from '@/types';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, title: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    filter: FilterType
}

export const Todolist = React.memo((props: PropsType) => {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    const onClickAllHandler = () => {
        props.changeFilter(props.id, 'all')
    }

    const onClickActiveHandler = () => {
        props.changeFilter(props.id,'active')
    }

    const onClickCompletedHandler = () => {
        props.changeFilter(props.id,'completed')
    }

    const addTask =(title: string) => {
        props.addTask(props.id, title)
    }

    let filteredTasks = props.tasks

    if (props.filter === 'active') {
        filteredTasks = filteredTasks.filter(el => !el.isDone)
    }
    if (props.filter === 'completed') {
        filteredTasks = filteredTasks.filter(el => el.isDone)
    }

    return (
        <Card className='p-2'>
            <CardHeader>
                <CardTitle className='flex justify-center items-center gap-2'>
                    <EditableSpan title={props.title} onChange={changeTodolistTitleHandler}/>
                    <Trash2 onClick={removeTodolistHandler}/>
                </CardTitle>
                <AddItemForm addTask={addTask} placeholder={'Add new task'}/>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                {filteredTasks.map(task => {
                        return (
                            <Task
                                key={task.id}
                                todolistId={props.id}
                                task={task}
                                removeTask={props.removeTask}
                                changeTaskStatus={props.changeTaskStatus}
                                changeTaskTitle={props.changeTaskTitle}
                            />
                        )
                    })
                }
            </CardContent>
            <CardFooter>
                <Button variant={props.filter === 'all' ? 'outline' : 'secondary'}  onClick={onClickAllHandler}>All</Button>
                <Button variant={props.filter === 'active' ? 'outline' : 'secondary'} color={'primary'} onClick={onClickActiveHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'outline' : 'secondary'} color={'secondary'} onClick={onClickCompletedHandler}>Completed</Button>
            </CardFooter>
        </Card>
    )
})
