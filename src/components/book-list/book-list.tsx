import React, {FC, useContext} from 'react';
import './book-list.css'
import BookListItem from '../book-list-item';
import { useSelector, useDispatch } from 'react-redux'
import { bookAddedToCart, booksLoaded, booksError, booksRequested } from '../../actions'
import Spinner from '../spiner';
import ErrorIndicator from '../error-indicator';
import MyContext from '../bookstore-service-context';
import { useEffect } from 'react';
import { RootState } from '../../reducers';
import { BookData } from '../../services/bookstore-service';

type BookListType = {
    books: Array<BookData>,
    onAddedToCart: (id: number) => any
}

const BookList: FC<BookListType> = ({books, onAddedToCart}) => {


    return (
        <ul className="book-list">
            {
            books.map(
            (book: BookData) => {
            return (
                <li key={book.id}>
                    <BookListItem 
                    book={book}
                    onAddedToCart={() => onAddedToCart(book.id)}/>
                </li>
            )
            }
            )
            }
        </ul>
    )
}

const BookListContainer = () => {

    

    const upBookList = useSelector((state: RootState) => state.bookList)

    const serviceValue = useContext(MyContext)

    const dispatch = useDispatch()

    const { books, loading, error } = upBookList
    
    useEffect(() => {
        dispatch(booksRequested())
            serviceValue.getBooks()
            .then((data: any) => dispatch(booksLoaded(data)))
            .catch((err: any) => dispatch(booksError(err)))}, [dispatch, serviceValue] )


    if (loading) {
        return (<Spinner />)
    }

    if (error) {
        return (<ErrorIndicator />)
    }

    return (
        <BookList books={books} onAddedToCart={(id: number) => dispatch(bookAddedToCart(id))}/>
    )

}

export default BookListContainer