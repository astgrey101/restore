import React, { FC } from 'react';
import './shop-header.css';
import { Link } from 'react-router-dom';

type ShopHeaderType = {
  numItems: number,
  total: number
}

const ShopHeader:FC<ShopHeaderType> = ({ numItems, total }) => (
  <header className="shop-header row">
    <Link to="/">
      <div data-testid="link-to-main-page" className="logo text-dark">ReStore</div>
    </Link>
    <div className="shop-items">
      <Link to="/catalog">
        <div data-testid="link-to-catalog" className="store">Books Catalog</div>
      </Link>
      <Link to="/items">
        <div className="shopping-cart" data-testid="link-to-shopping-cart">
          <i className="cart-icon fa fa-shopping-cart" />
          {numItems}
          {' '}
          items ($
          {total}
          )
        </div>
      </Link>
    </div>

  </header>
);

export default ShopHeader;
