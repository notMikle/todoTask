import React, {useCallback} from 'react';
import {EditableSpan} from './EditableSpan';
import {Checkbox} from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import {TaskType} from '@/types';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (todolistId: string, id: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, taskStatus: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const removeTaskHandler = useCallback(() => {
        props.removeTask(props.todolistId, props.task.id)
    }, [props.todolistId, props.task.id])

    const onChangeTitleHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newTitle)
    }, [props.todolistId, props.task.id])

    return (
        <div key={props.task.id} className='flex gap-1 items-center'>
            <Checkbox
                onCheckedChange={(checked) => {
                    props.changeTaskStatus(props.todolistId, props.task.id, !!checked);
                }}
                checked={props.task.isDone}
            />
            <EditableSpan onChange={onChangeTitleHandler} title={props.task.title}/>
            <Trash2 onClick={removeTaskHandler}>
            </Trash2>
        </div>
    )
});

