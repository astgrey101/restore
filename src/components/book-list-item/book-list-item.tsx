import React, { FC, MouseEvent } from 'react';
import '../book-list/book-list.css';
import { useDispatch } from 'react-redux';
import { BookData } from '../../services/bookstore-service';
import { addBookToCart } from '../../actions';

interface BookListItemInterface {
  book: BookData,
  style: React.CSSProperties | undefined
  switchDisplayEditForm: (event: MouseEvent<HTMLButtonElement>) => void
}

const BookListItem: FC<BookListItemInterface> = (
  {
    book,
    style,
    switchDisplayEditForm,
  },
) => {
  const dispatch = useDispatch();
  const {
    id, title, author, price, coverImage,
  } = book;
  const testId = `book-${id}`;
  const addToCartBtnTestId = `add-to-cart-btn-${id}`;
  const editBookBtnTestId = `edit-book-btn-${id}`;
  return (
    <div className="book-list-item" style={style} data-testid={testId}>
      <div className="book-cover">
        <img src={coverImage} alt="cover" />
      </div>
      <div className="book-details">
        <span className="book-title" data-testid="book-title">{title}</span>
        <div className="book-author" data-testid="book-author">{author}</div>
        <div className="book-price" data-testid="book-price">
          $
          {price}
        </div>
        <div>
          <button
            type="button"
            className="btn btn-info add-to-cart"
            onClick={() => dispatch(addBookToCart(id))}
            data-testid={addToCartBtnTestId}
          >
            Add to cart
          </button>
          <button
            type="button"
            className="btn btn-info edit-book"
            onClick={(event) => switchDisplayEditForm(event)}
            data-id={id}
            data-testid={editBookBtnTestId}
          >
            Edit Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookListItem;
