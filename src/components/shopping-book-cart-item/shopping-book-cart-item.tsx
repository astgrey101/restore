import React, { FC, useMemo } from 'react';
import './shopping-book-cart-item.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBookToCart,
  removeBookFromCart,
  removeAllBooksFromCart,
} from '../../actions';
import { getBookItemById } from '../../reducers/selectors';

interface ShoppingBookCartItemType {
  item:
      {id: number,
      amount: number
    }
  idx: number
}

const ShoppingBookCartItem: FC<ShoppingBookCartItemType> = ({ item, idx }) => {
  const dispatch = useDispatch();

  const { id, amount } = item;

  const bookItem = useSelector(useMemo(() => getBookItemById(item.id), [item.id]));

  if (!bookItem) {
    return <></>;
  }
  const { title, price, coverImage } = bookItem;

  return (
    <tr key={id}>
      <td>{idx + 1}</td>
      <td>
        <div className="book-coverage">
          <img src={coverImage} alt="cover" />
        </div>
      </td>
      <td>{title}</td>
      <td>{amount}</td>
      <td>
        $
        {price * amount}
      </td>
      <td>
        <button
          type="button"
          onClick={() => dispatch(removeAllBooksFromCart(id))}
          className="btn btn-outline-danger btn-sm float-right"
        >
          <i className="fa fa-trash-o" />
        </button>
        <button
          type="button"
          onClick={() => dispatch(addBookToCart(id))}
          className="btn btn-outline-success btn-sm float-right"
        >
          <i className="fa fa-plus-circle" />
        </button>
        <button
          type="button"
          onClick={() => dispatch(removeBookFromCart(id))}
          className="btn btn-outline-warning btn-sm float-right"
        >
          <i className="fa fa-minus-circle" />
        </button>
      </td>
    </tr>
  );
};

export default ShoppingBookCartItem;
