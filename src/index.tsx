import React from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { Layout } from 'antd'

import "./styles/index.css"
import { Listings, Listing, Home, Host, User, LogIn, NotFound } from './sections'

const client = new ApolloClient({ uri: '/api' })

const App = () => {
  return (
    <Router>
      <Layout id="app">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/host" component={Host} />
          <Route path="/listings/:location?" component={Listings} />
          <Route path="/listing/:id" component={Listing} />
          <Route path="/login" component={LogIn} />
          <Route path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
