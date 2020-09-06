import React from "react";
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import "./styles/index.css"
import { Listings } from './sections/Listings'

const client = new ApolloClient({ uri: '/api' })

render(
  <ApolloProvider client={client}>
    <Listings title="TinyHouse Listings" />
  </ApolloProvider>,
  document.getElementById('root')
);
