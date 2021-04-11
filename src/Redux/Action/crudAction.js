export const addTaskListUsingThunk = (obj) => {
    return async (dispatch) => {
        const data = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
        const res = await data.json()
        const setStatus = res.map(x => {
            x.completed = true
            return x
        })
        dispatch({
            type: 'ADD_TASK_LIST_USING_THUNK',
            payload: setStatus
        })
    }
}

export const createTask = (obj) => {
    return {
        type: 'CREATE_TASK',
        payload: obj
    }
}

export const deleteTask = (obj) => {
    return {
        type: 'DELETE_TASK',
        payload: obj
    }
}

export const changeTaskStatus = (obj) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        payload: obj
    }
}