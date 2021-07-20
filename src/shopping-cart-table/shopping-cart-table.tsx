import './shopping-cart-table.css';
import store from '../store';
import { getTotalSum } from './selectors';
import ShoppingBookCartItem from '../shopping-book-cart-item';
import { getCartItemsList } from '../reducers/selectors';
import { useSelector } from 'react-redux';


const ShoppingCartTable = () => {

  const totalSum = useSelector(getTotalSum)
  const cartItems = useSelector(getCartItemsList)
  
  return (
    <div className="shopping-cart-table">
      <h2>Your Order</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Count</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          { cartItems.map((item, idx) => <ShoppingBookCartItem key={item.id} idx={idx} item={item} />)}
        </tbody>
      </table>

      <div className="total">
        Total: ${totalSum}
      </div>
    </div>
  );
};

export default ShoppingCartTable
