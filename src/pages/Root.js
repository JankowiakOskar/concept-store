import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainTemplate from 'templates/MainTemplate'
import routes from 'routes'
import Home from './Home'
import WishListPage from './WishListPage'
import Clothes from './Clothes'

const Root = () => {
  return (
    <Router>
      <div className="App">
        <MainTemplate>
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route path={routes.wishlist} component={WishListPage} />
            <Route path={routes.clothes} component={Clothes} />
          </Switch>
        </MainTemplate>
      </div>
    </Router>
  )
}

export default Root
