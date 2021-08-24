import { createStore, applyMiddleware } from "redux";
import { compose } from "redux";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['shoppingCart']
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export let store = createStore(persistedReducer, composeEnhancer(applyMiddleware()))
export let persistor = persistStore(store)
