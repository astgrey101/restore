import { createStore, applyMiddleware } from "redux";
import { compose } from "redux";

import rootReducer from "./reducers";



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware()))


export default store