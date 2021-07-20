import bookList from "./book-list"
import shoppingCart from "./shopping-cart"
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    bookList,
    shoppingCart
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
