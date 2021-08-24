import { BookListPayloadType } from "../actions";
import { BookData } from "../services/bookstore-service";

const initialState = {
    books: [],
    loading: true,
    error: null
}

interface BookListType {
    books: Array<BookData>,
    loading: boolean,
    error: any
}

const bookList = (state: BookListType = initialState, action: BookListPayloadType): BookListType  => {

    switch(action.type) {
        case 'FETCH_BOOKS_REQUEST':
            return {
                books: [],
                loading: true,
                error: null
            };

        case 'FETCH_BOOKS_SUCCESS': 
            return {
                books: action.payload!,
                loading: false,
                error: null
            };

        case 'FETCH_BOOKS_FAILURE':
            return {
                books: [],
                loading: false,
                error: action.payload!
            };

        default:
            return state
    }
}

export default bookList
