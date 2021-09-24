import React, { useContext, useEffect } from 'react';
import './shopping-cart-table.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalSum } from './selectors';
import ShoppingBookCartItem from '../shopping-book-cart-item';
import { getCartItemsList } from '../reducers/selectors';
import MyContext from '../components/bookstore-service-context';
import { fetchBooksAsync } from '../actions';

const ShoppingCartTable = () => {
  // block added here in order to set all books in state when page is loaded
  const dispatch = useDispatch();
  const serviceValue = useContext(MyContext);
  useEffect(
    () => {
      dispatch(fetchBooksAsync(serviceValue));
    },
    [dispatch, serviceValue],
  );

  const totalSum = useSelector(getTotalSum);
  const cartItems = useSelector(getCartItemsList);

  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th className="title">Title</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          { cartItems.map(
            (item, idx) => <ShoppingBookCartItem key={item.id} idx={idx} item={item} />,
          )}
        </tbody>
      </table>

      <div className="total">
        Total: $
        {totalSum}
      </div>
    </div>
  );
};

export default ShoppingCartTable;
