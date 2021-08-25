import './book-list.css'
import '../book-list-item/book-list-item.css'
import { useSelector, useDispatch } from 'react-redux'
import { bookAddedToCart } from '../../actions'
import Spinner from '../spiner';
import ErrorIndicator from '../error-indicator';
import { RootState } from '../../reducers';
import { useState } from 'react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import MyContext from '../bookstore-service-context/bookstore-service-context'
import { booksLoaded, booksError, booksRequested } from '../../actions'
import { SearchField } from '../search-field/search-field';
import {List, AutoSizer, WindowScroller} from 'react-virtualized';

const BookListContainer = () => {

    const [input, setInput] = useState('')

    const upBookList = useSelector((state: RootState) => state.bookList)

    const serviceValue = useContext(MyContext)

    const dispatch = useDispatch()

    const { books, loading, error } = upBookList

    const savedBookList = useMemo(
        () => {
            return books.filter(
            (item) => item.title.toLowerCase().includes(input.toLowerCase())
        )}, 
        [input, books]
    )

    useEffect(
        () => {
            dispatch(booksRequested())
                serviceValue.getBooks()
                .then((data: any) => dispatch(booksLoaded(data)))
                .catch((err: any) => dispatch(booksError(err)));
        }, 
        [dispatch, serviceValue] 
    )

    const rowRendererItem = ({index, key, style}: any) => {

        let boook = savedBookList[index];
        if (boook) {
        const { id, title, author, price, coverImage } = boook;
        return (
          <div className="book-list-item" style={style} key={key}>
            <div className="book-cover">
              <img src={coverImage} alt="cover" />
            </div>
            <div className="book-details">
              <span className="book-title">{title}</span>
              <div className="book-author">{author}</div>
              <div className="book-price">${price}</div>
              <button 
                onClick={() => dispatch(bookAddedToCart(id))}
                className="btn btn-info add-to-cart">
                Add to cart</button>
            </div>
          </div>
        );
        }
      }

    if (loading) {
        return (<Spinner />)
    }

    if (error) {
        return (<ErrorIndicator />)
    }

    return (
        <div>
            <SearchField keyword={input} setKeyword={setInput}/>
            <WindowScroller>
            {({ height, registerChild, scrollTop }) => (
                <div ref={el => registerChild(el)} className={"book-list"}>
                    <AutoSizer disableHeight>
                        {
                            ({width}) => (
                                <List
                                    width={width}
                                    height={height}
                                    rowCount={1000}
                                    rowHeight={220}
                                    autoHeight
                                    scrollTop={scrollTop}
                                    rowRenderer={rowRendererItem}
                                />
                            )
                        }
                    </AutoSizer>
                </div>
            )}
            </WindowScroller> 
        </div>
    )

}

export default BookListContainer