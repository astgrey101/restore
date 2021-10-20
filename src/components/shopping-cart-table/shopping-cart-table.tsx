import React, { useContext, useEffect } from 'react';
import './shopping-cart-table.css';
import { useDispatch, useSelector } from 'react-redux';
import ShoppingBookCartItem from '../shopping-book-cart-item';
import { getCartItemsList, getTotalSum } from '../../reducers/selectors';
import MyContext from '../bookstore-service-context';
import { fetchBooksAsync } from '../../actions';

const ShoppingCartTable = (): JSX.Element => {
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
            <th data-testid="shopping-cart-item-header">Item</th>
            <th data-testid="shopping-cart-title-header" className="title">Title</th>
            <th data-testid="shopping-cart-count-header">Count</th>
            <th data-testid="shopping-cart-price-header">Price</th>
            <th data-testid="shopping-cart-action-header">Action</th>
          </tr>
        </thead>

        <tbody>
          { cartItems.map(
            (item, idx) => <ShoppingBookCartItem key={item.id} idx={idx} item={item} />,
          )}
        </tbody>
      </table>

      <div data-testid="shopping-cart-total" className="total">
        Total: $
        {totalSum}
      </div>
    </div>
  );
};

export default ShoppingCartTable;
