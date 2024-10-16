import React, {ChangeEvent, useState} from 'react';
import {Input} from '@/components/ui/input.tsx';

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan is called')

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }

    return editMode
        ? <Input onChange={onChangeHandler} value={title} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>

})