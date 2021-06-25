import React, {Component, FC} from 'react';
import './book-list.css'
import BookListItem from '../book-list-item';
import { connect } from 'react-redux'
import { withBookstoreService } from '../hoc';
import { fetchBooks, bookAddedToCart } from '../../actions'
import { compose } from '../../utils'
import Spinner from '../spiner';
import ErrorIndicator from '../error-indicator';

type BookListType = {
    books: any,
    onAddedToCart: any
}

type BookListContainerType = {
    books: any,
    loading: any,
    error: any,
    fetchBooks: any,
    onAddedToCart: any
}

const BookList: FC<BookListType> = ({books, onAddedToCart}) => {
    return (
        <ul className="book-list">
            {
            books.map(
            (book: any) => {
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

class BookListContainer extends Component<BookListContainerType> {

    componentDidMount() {
        this.props.fetchBooks()
    }

    render () {
        const { books, loading, error, onAddedToCart } = this.props

        if (loading) {
            return <Spinner />
        }

        if (error) {
            return <ErrorIndicator />
        }

        return (
            <BookList books={books} onAddedToCart={onAddedToCart}/>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        books: state.bookList.books,
        loading: state.bookList.loading,
        error: state.bookList.error
    }
}

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    const {bookstoreService} = ownProps
    return {
        fetchBooks: fetchBooks(bookstoreService, dispatch),
        onAddedToCart: (id: any) => dispatch(bookAddedToCart(id))
    }
}

export default compose(
    withBookstoreService(),
    connect(mapStateToProps, mapDispatchToProps)
)(BookListContainer)