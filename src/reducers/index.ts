import updateBookList from "./book-list"
import updateshoppingCart from "./shopping-cart"

const reducer = (state: any, action: any) => {
    return {
        bookList: updateBookList(state, action),
        shoppingCart: updateshoppingCart(state, action)
    } 
}

export default reducer
