import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Input} from '@/components/ui/input.tsx';
import { Plus } from 'lucide-react';


type AddItemFormPropsType = {
    placeholder:string
    addTask: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const addTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    return (
        <>
            <div className='flex justify-center items-center gap-2'>
                <Input
                    placeholder={props.placeholder}
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <Plus onClick={addTaskHandler}>
                </Plus>
            </div>
            {error&&<span>{error}</span>}
        </>
    )
})