import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, useMutation } from "@apollo/client";
import { Layout, Affix, Spin } from "antd";

import { Viewer } from "./lib/types";
import { LogIn as LogInData, LogInVariables } from "./lib/graphql/mutations/LogIn/__generated__/LogIn";
import { LOG_IN } from "./lib/graphql/mutations";
import {
  Listings,
  Listing,
  Home,
  Host,
  User,
  LogIn,
  NotFound,
  AppHeader,
} from "./sections";
import { AppHeaderSkeleton, ErrorBanner } from "./lib/components";

import "./styles/index.css";

const client = new ApolloClient({ uri: "/api", cache: new InMemoryCache() });

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: data => {
      if (data?.logIn) setViewer(data.logIn)
    }
  })
  const logInRef = useRef(logIn)

  useEffect(() => {
    logInRef.current()
  }, [])

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching Tinyhouse" />
        </div>
      </Layout>
    );
  }

  const logInErrorBannerElement = error ? <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" /> : null

  return (
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0}>
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/host" component={Host} />
          <Route path="/listings/:location?" component={Listings} />
          <Route path="/listing/:id" component={Listing} />
          <Route
            path="/login"
            render={(props) => <LogIn {...props} setViewer={setViewer} />}
          />
          <Route path="/user/:id" component={User} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
