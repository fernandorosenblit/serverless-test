import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Route, Switch } from 'react-router'

import { Navigation } from 'components/Navigation'

import { Details } from 'pages/Details'
import { NotFound } from 'pages/Error'
import { Home } from 'pages/Home'

const App = () => (
  <>
    <Helmet>
      <title>{process.env.REACT_APP_NAME}</title>
    </Helmet>

    <div>
      <Navigation />

      <Switch>
        <Route path="/details/:id" component={Details} />
        <Route path="/" component={Home} exact />

        <Route component={NotFound} />
      </Switch>
    </div>
  </>
)

export default App
