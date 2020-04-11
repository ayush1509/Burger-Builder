import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

import Layout from './Components/Layout/Layout'
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders'
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import {autoSignIn} from './store/action/index'

class App extends Component {
  componentDidMount () {
    this.props.onAutoSignIn()
  }
  render () {
  let routes = (
    <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to ="/"/>
    </Switch>

  )

  if(this.props.isAuthenticated){
    routes = (
      <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
    </Switch>
    )
  }


  return (
    <div className="App">
      <Layout>
        {routes}
        <Switch>
          {/* <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/"/> */}


        </Switch>


      </Layout>
    </div>
  );
}
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn : () => dispatch(autoSignIn())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
// export default App