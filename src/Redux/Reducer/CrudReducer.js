export const initialState = []

const CrudReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'ADD_TASK_LIST_USING_THUNK':
            return state = [...state, ...action.payload]

        case 'CREATE_TASK':
            return state = [...state, action.payload]

        case 'DELETE_TASK':
            const deleteTask = state.filter(c => c.id !== action.payload)
            return state = [...deleteTask];

        case 'CHANGE_TASK_STATUS':
            const changeStatus = state.map(x => {
                if (x.id === action.payload.id) {
                    x.completed = action.payload.isChecked
                }
                return x
            })
            return state = [...changeStatus];

        default:
            return state
    }
}


export default CrudReducer;