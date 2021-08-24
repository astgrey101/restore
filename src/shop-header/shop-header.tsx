import {FC} from 'react';
import './shop-header.css';
import { Link } from 'react-router-dom'

type ShopHeaderType = {
  numItems: number,
  total: number
}

const ShopHeader:FC<ShopHeaderType> = ({ numItems, total }) => {
  return (
    <header className="shop-header row">
      <Link to="/">
        <div className="logo text-dark">ReStore</div>
      </Link>
      <div className="shop-items">
        <Link to="/catalog">
            <div className="store">Books Catalog</div>
        </Link>
        <Link to="/items">
          <div className="shopping-cart">
              <i className="cart-icon fa fa-shopping-cart" />
              {numItems} items (${total})
          </div>
        </Link>
      </div>
      
    </header>
  );
};

export default ShopHeader;
