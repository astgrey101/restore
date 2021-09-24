import React, {
  MouseEvent, useCallback, useState, useMemo, useContext, useEffect,
} from 'react';
import './book-list.css';
import '../book-list-item/book-list-item.css';
import { useSelector, useDispatch } from 'react-redux';
import { List, AutoSizer, WindowScroller } from 'react-virtualized';
import { addBookToCart, fetchBooksAsync } from '../../actions';
import Spinner from '../spiner';
import ErrorIndicator from '../error-indicator';
import { RootState } from '../../reducers';
import MyContext from '../bookstore-service-context/bookstore-service-context';
import UpdateBookForm from '../update-book-form';
import AddBookForm from '../add-book-form';
import SearchField from '../search-field';

const BookListContainer = () => {
  const [input, setInput] = useState('');
  const [updateBookId, setUpdateBookId] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState<number | null>(null);

  const setUpdateBookFormVisible = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (event.currentTarget.dataset.id) {
        setUpdateBookId(Number(event.currentTarget.dataset.id));
        setValue(Number(event.currentTarget.dataset.id));
      }
      setIsVisible(true);
    }, [],
  );

  const setAddBookFormVisible = useCallback(() => {
    if (!isVisible || !value) {
      setIsVisible(!isVisible);
    }
    setValue(null);
  }, [isVisible, value]);

  const isAddNewBook = useMemo(() => isVisible && !value, [isVisible, value]);

  const isEditBook = useMemo(() => isVisible && value, [isVisible, value]);

  const upBookList = useSelector((state: RootState) => state.bookList);

  const serviceValue = useContext(MyContext);

  const dispatch = useDispatch();

  const { books, loading, error } = upBookList;

  const savedBookList = useMemo(
    () => books.filter(
      (item) => item.title.toLowerCase().includes(input.toLowerCase()),
    ),
    [input, books],
  );

  useEffect(
    () => { dispatch(fetchBooksAsync(serviceValue)); }, [dispatch, serviceValue],
  );

  const rowRendererItem = ({ index, key, style }: any) => {
    const book = savedBookList[index];
    if (book) {
      const {
        id, title, author, price, coverImage,
      } = book;
      return (
        <div className="book-list-item" style={style} key={key}>
          <div className="book-cover">
            <img src={coverImage} alt="cover" />
          </div>
          <div className="book-details">
            <span className="book-title">{title}</span>
            <div className="book-author">{author}</div>
            <div className="book-price">
              $
              {price}
            </div>
            <div>
              <button type="button" className="btn btn-info add-to-cart" onClick={() => dispatch(addBookToCart(id))}>
                Add to cart
              </button>
              <button type="button" className="btn btn-info edit-book" onClick={setUpdateBookFormVisible} data-id={id}>
                Edit Book
              </button>
            </div>
          </div>
        </div>
      );
    } return null;
  };

  if (loading) {
    return (<Spinner />);
  }

  if (error) {
    return (<ErrorIndicator />);
  }

  return (
    <div>
      <SearchField keyword={input} setKeyword={setInput} />
      <button type="button" className="btn btn-info show-add-new-book" onClick={setAddBookFormVisible}>
        Add Book
      </button>

      {isAddNewBook && (<AddBookForm />)}

      {
        isEditBook && (
        <UpdateBookForm
          bookId={updateBookId}
          switchDisplayEditForm={() => setIsVisible(false)}
        />
        )
      }

      <div>
        <WindowScroller>
          {({ height, registerChild, scrollTop }) => (
            <div ref={(el) => registerChild(el)} className="book-list">
              <AutoSizer disableHeight>
                {
                                    ({ width }) => (
                                      <List
                                        width={width}
                                        height={height}
                                        rowCount={savedBookList.length}
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

    </div>
  );
};

export default BookListContainer;
