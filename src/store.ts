import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducers";


const logMiddleware = (store: any) => (dispatch: any) => (action: any) => {
    console.log(action, store.getState())
    return dispatch(action)
}

const stringMiddleware = () => (dispatch: any) => (action: any) => {
    if (typeof action === 'string') {
        return dispatch({
            type: action
        })
    }
    return dispatch(action)
}

const store = createStore(reducer, applyMiddleware(
    thunkMiddleware, stringMiddleware, logMiddleware))

const delayedActionCreator = (timeout: any) => (dispatch: any) => {
    setTimeout(() => dispatch({
        type: 'DELAYED_ACTION'
    }), timeout)
}

store.dispatch(delayedActionCreator(3000))

store.dispatch('HELLO_WORLD')

export default store