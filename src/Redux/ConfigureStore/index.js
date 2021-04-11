import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { throttle } from 'lodash';
import allReducer from '../Reducer';
import { loadState, saveState } from '../../services/localStorage';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore() {
    const persistedState = loadState();
    const store = createStore(
        allReducer,
        persistedState,
        composeEnhancer(applyMiddleware(thunk)),
    )
    store.subscribe(
        throttle(() => {
            saveState(store.getState());
        }, 1000),
    );
    return store;
}



