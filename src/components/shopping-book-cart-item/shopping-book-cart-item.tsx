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
  const bookItemSelector = useSelector(getBookItemById);
  const bookItem = useMemo(() => bookItemSelector(item.id), [item.id]);
  const itemImageTestId = `item-image-${id}`;
  const itemTitleTestId = `item-title-${id}`;
  const itemAmountTestId = `item-amount-${id}`;
  const itemPriceTestId = `item-price-${id}`;
  const itemAllRemoveBtnTestId = `item-all-remove-btn-${id}`;
  const itemRemoveBtnTestId = `item-remove-btn-${id}`;
  const itemAddBtnTestId = `item-add-btn-${id}`;
  if (!bookItem) {
    return <></>;
  }
  const { title, price, coverImage } = bookItem;

  return (
    <tr key={id}>
      <td>{idx + 1}</td>
      <td data-testid={itemImageTestId}>
        <div className="book-coverage">
          <img src={coverImage} alt="cover" />
        </div>
      </td>
      <td data-testid={itemTitleTestId}>{title}</td>
      <td data-testid={itemAmountTestId}>{amount}</td>
      <td data-testid={itemPriceTestId}>
        $
        {price * amount}
      </td>
      <td>
        <button
          data-testid={itemAllRemoveBtnTestId}
          type="button"
          onClick={() => dispatch(removeAllBooksFromCart(id))}
          className="btn btn-outline-danger btn-sm float-right"
        >
          <i className="fa fa-trash-o" />
        </button>
        <button
          data-testid={itemAddBtnTestId}
          type="button"
          onClick={() => dispatch(addBookToCart(id))}
          className="btn btn-outline-success btn-sm float-right"
        >
          <i className="fa fa-plus-circle" />
        </button>
        <button
          data-testid={itemRemoveBtnTestId}
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
