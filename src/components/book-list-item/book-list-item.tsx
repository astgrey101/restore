import React, { FC } from 'react';
import { BookData } from '../../services/bookstore-service';
import './book-list-item.css';

export type BookListItemType = {
    book: BookData,
    onAddedToCart: any
}

const BookListItem: FC<BookListItemType> = ({ book, onAddedToCart }) => {
  const {
    title, author, price, coverImage,
  } = book;
  return (
    <div className="book-list-item">
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
        <button
          type="button"
          onClick={onAddedToCart}
          className="btn btn-info add-to-cart"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default BookListItem;
