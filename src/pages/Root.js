import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainTemplate from 'templates/MainTemplate';
import routes from 'routes';
import Home from './Home';
import WishListPage from './WishListPage';
import Clothes from './Clothes';
import DetailPage from './DetailPage';
import CheckoutPage from './CheckoutPage';

const Root = () => {
  return (
    <Router>
      <div className="App">
        <MainTemplate>
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route path={routes.wishlist} component={WishListPage} />
            <Route exact path={routes.clothes} component={Clothes} />
            <Route path={routes.detailClothes} component={DetailPage} />
            <Route path={routes.checkout} component={CheckoutPage} />
          </Switch>
        </MainTemplate>
      </div>
    </Router>
  );
};

export default Root;
