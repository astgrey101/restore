
const booksLoaded = (newBooks: any) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
}

const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
}

const booksError = (error: any) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
}

export const bookAddedToCart = (bookId: any) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: bookId
    }
}

export const bookRemovedFromCart = (bookId: any) => {
    return {
        type: 'BOOK_REMOVED_TO_CART',
        payload: bookId
    }
}

export const allbooksRemovedFromCart = (bookId: any) => {
    return {
        type: 'ALL_BOOKS_REMOVED_TO_CART',
        payload: bookId
    }
}

const fetchBooks = (bookstoreService: any, dispatch: any) => () => {
    dispatch(booksRequested())
    bookstoreService.getBooks()
        .then((data: any) => dispatch(booksLoaded(data)))
        .catch((err: any) => dispatch(booksError(err)))
}

export {
    fetchBooks
}