import './app.css';
import { Route, Switch } from 'react-router-dom'
import { CatalogPage, MainPage, ShoppingCardPage } from '../pages';
import ShopHeader from '../../shop-header';
import { useSelector } from 'react-redux';
import { getTotalAmmount, getTotalSum } from '../../shopping-cart-table/selectors';



const App = () => {

  const totalSum= useSelector(getTotalSum)
  const tottalAmmount = useSelector(getTotalAmmount)

  return (
    <main role="main" className="container">
      <ShopHeader numItems={tottalAmmount} total={totalSum}/>
      <Switch>
          <Route 
            path="/"
            component={MainPage}
            exact/>
          <Route 
            path="/catalog"
            component={CatalogPage}
            exact/>
          <Route 
            path="/items"
            component={ShoppingCardPage}
            />
      </Switch>
    </main>
  )
};

export default App;
