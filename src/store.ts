import {
  createStore, applyMiddleware, compose, AnyAction,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk, { ThunkDispatch } from 'redux-thunk';
import rootReducer, { RootState } from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['shoppingCart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));
export const persistor = persistStore(store);

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
