import React, { useState } from "react";
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Layout, Affix } from 'antd'

import "./styles/index.css"
import { Viewer } from './lib/types'
import { Listings, Listing, Home, Host, User, LogIn, NotFound, AppHeader } from './sections'

const client = new ApolloClient({ uri: '/api', cache: new InMemoryCache() })

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer)
  
  return (
    <Router>
      <Layout id="app">
        <Affix offsetTop={0}>
         <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/host" component={Host} />
          <Route path="/listings/:location?" component={Listings} />
          <Route path="/listing/:id" component={Listing} />
          <Route path="/login" render={(props) => <LogIn {...props} setViewer={setViewer} />} />
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
