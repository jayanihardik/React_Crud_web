import React, { useState, useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import { toast } from 'react-toastify';

import { createTask, addTaskListUsingThunk, deleteTask, changeTaskStatus } from '../../Redux/Action/crudAction'

import './Crud.css'

const Crud = () => {
    const dispatch = useDispatch();
    const crudList = useSelector(state => state.crud)

    const [task, setTask] = useState('')

    const addTask = () => {
        const taskObj = {
            name: task,
            id: Math.floor(Math.random() * 100000 + 1),
            completed: false
        };
        dispatch(createTask(taskObj))
        setTask('')
        toast.success("Task add successfully")
    }

    const handleChange = (e) => {
        setTask(e.target.value)
    }

    const handleChangeCheckBox = (id, e) => {
        const obj = {
            isChecked: e.target.checked,
            id
        }
        dispatch(changeTaskStatus(obj))
        toast.success("Status change successfully")
    }

    useEffect(() => {
        if (!localStorage.getItem('state'))
            dispatch(addTaskListUsingThunk())
    }, [])

    return (
        <Container>
            <div className="text-center">
                <div className="mt-3">
                    <h2>
                        Create task
                    </h2>
                </div>
                <div className="mt-3">
                    <Input size='large' value={task} className="mr-2" onChange={(e) => handleChange(e)} placeholder='Enter task' />
                    <Button content='add' onClick={() => addTask()} secondary />
                </div>
                {crudList && crudList.map(x => {
                    return (
                        <div key={x.id}>
                            <div className="mt-2">
                                <div className="inline-block">
                                    <div className="ui cards">
                                        <div className="card">
                                            <div className="content">
                                                <Grid columns='two' divided>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <div className="mt-1">
                                                                <label>{x.name}</label>
                                                            </div>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <div>
                                                                <label></label>
                                                                <input type="checkbox" defaultChecked={x.completed} onChange={(e) => handleChangeCheckBox(x.id, e)} name="example" />
                                                                <button className="ui icon button ml-2" onClick={(e) => {
                                                                    toast.error("Task removed successfully")
                                                                    dispatch(deleteTask(x.id))
                                                                }}>
                                                                    <i aria-hidden="true" className="delete icon"></i>
                                                                </button>
                                                            </div>
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                </Grid>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Container>
    )
}

export default Crud