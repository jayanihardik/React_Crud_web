import { combineReducers } from 'redux';
import CrudReducer from './CrudReducer'

const allReducer = combineReducers({
    crud: CrudReducer
})

export default allReducer;