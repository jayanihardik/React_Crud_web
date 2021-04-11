import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { Grid } from 'semantic-ui-react'
import { changeTaskStatus } from '../../Redux/Action/crudAction';
import './Completed.css';

const Completed = () => {
    const dispatch = useDispatch();
    const completedList = useSelector(state => state.crud)

    const handleChangeCheckBox = (id, e) => {
        const obj = {
            isChecked: e.target.checked,
            id
        }
        dispatch(changeTaskStatus(obj))
    }

    return (
        <Container>
            <div className="text-center">
                <div className="mt-3">
                    <h2>
                        Completed task
                    </h2>
                </div>
                {completedList && completedList.map(x => x.completed &&
                    (
                        <div key={x.id}>
                            <div className="mt-2">
                                <div className="inline-block">
                                    <div className="ui cards">
                                        <div className="card">
                                            <div className="content">
                                                <Grid columns='two' divided>
                                                    <Grid.Row>
                                                        <Grid.Column>
                                                            <div>
                                                                <label>{x.name}</label>
                                                            </div>
                                                        </Grid.Column>
                                                        <Grid.Column>
                                                            <div>
                                                                <label></label>
                                                                <input type="checkbox" defaultChecked={x.completed} onChange={(e) => handleChangeCheckBox(x.id, e)} name="example" />
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
                )}
            </div>
        </Container>
    )
}

export default Completed