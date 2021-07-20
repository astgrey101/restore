import React from 'react';
import './app.css';
import { Route, Switch } from 'react-router-dom'
import { HomePage, CardPage } from '../pages';
import ShopHeader from '../../shop-header';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import store from '../../store';
import { getTotalAmmount, getTotalSum } from '../../shopping-cart-table/selectors';



const App = () => {
  const shoppingCart = useSelector((state: RootState) => state.shoppingCart)

  const totalSum= useSelector(getTotalSum)
  const tottalAmmount = useSelector(getTotalAmmount)

  const {cartItems} = shoppingCart
  return (
    <main role="main" className="container">
      <ShopHeader numItems={tottalAmmount} total={totalSum}/>
      <Switch>
          <Route 
            path="/"
            component={HomePage}
            exact/>
          <Route 
            path="/card"
            component={CardPage}
            />
      </Switch>
    </main>
  )
};

export default App;
