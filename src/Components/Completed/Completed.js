import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { changeTaskStatus } from '../../Redux/Action/crudAction';
import './Completed.css';

const grid = 8;
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "lightgreen" : "white",
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "#69c77f",
    padding: grid,
    width: 400
});

const Completed = () => {
    const dispatch = useDispatch();
    const completedList = useSelector(state => state.crud)
    const [itemData, setItemData] = useState('')

    useEffect(() => {
        const competedData = completedList.filter(x => x.completed)
        setItemData(competedData)
    }, [completedList])

    const handleChangeCheckBox = (id, e) => {
        const obj = {
            isChecked: e.target.checked,
            id
        }
        dispatch(changeTaskStatus(obj))
        toast.success("Status changed successfully")
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            itemData,
            result.source.index,
            result.destination.index
        );
        setItemData(items);
    }

    return (
        <Container>
            <div className="text-center">
                <div className="mt-3">
                    <h2>
                        Completed task
                    </h2>
                </div>
                <div className="card-center">
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                >
                                    {itemData && itemData.map((item, index) => (
                                        <Draggable key={item.name} draggableId={item.name} index={index}>
                                            {(provided, snapshot) => (
                                                <div className="d-flex justify-space-between"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    {item.name}
                                                    <div>
                                                        <label></label>
                                                        <input type="checkbox" defaultChecked={item.completed} onChange={(e) => handleChangeCheckBox(item.id, e)} name="example" />
                                                    </div>
                                                </div>

                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        </Container>
    )
}

export default Completed