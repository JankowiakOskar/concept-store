import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import MainTemplate from 'templates/MainTemplate'
import Home from './Home'

const Root = () => {
  return (
    <div className="App">
      <MainTemplate>
        <Router>
          <Switch>
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </MainTemplate>
    </div>
  )
}

export default Root
