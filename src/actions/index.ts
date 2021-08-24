import { BookData } from "../services/bookstore-service"

export interface BookPayloadType {
    type: string,
    payload?: {
        bookId: number, 
        amount: number
    }

}

export interface BookListPayloadType {
    type: string,
    payload?: Array<BookData>

}


export const booksLoaded = (newBooks: Array<BookData>) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
}

export const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
}

export const booksError = (error: any) => {
    return {
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
}

export const bookAddedToCart = (bookId: number, amount: number = 1) => {
    return {
        type: 'BOOK_ADDED_TO_CART',
        payload: {bookId, amount}
    }
}

export const bookRemovedFromCart = (bookId: number, amount: number = -1) => {
    return {
        type: 'BOOK_REMOVED_TO_CART',
        payload: {bookId, amount}
    }
}

export const allbooksRemovedFromCart = (bookId: number, amount: number = 0) => {
    return {
        type: 'ALL_BOOKS_REMOVED_TO_CART',
        payload: {bookId, amount}
    }
}
