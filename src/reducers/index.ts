import { combineReducers } from 'redux';
import bookList from './book-list';
import shoppingCart from './shopping-cart';

const rootReducer = combineReducers({
  bookList,
  shoppingCart,
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
