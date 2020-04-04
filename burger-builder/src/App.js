import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders'


function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
