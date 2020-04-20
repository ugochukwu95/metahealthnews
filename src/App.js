import React, { Component } from "react";
import { HealthFromUgoDataStore } from "./data/DataStore";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect }
from "react-router-dom";
import ArticleConnector from "./article/ArticleConnector";
import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { CookiesProvider } from 'react-cookie';

export default class App extends Component {
  render() {
    return <CookiesProvider>
      <Provider store={ HealthFromUgoDataStore }>
        <Router>
          <Switch>
            <Route path="/" component={ ArticleConnector } />
            <Redirect to="/" />
          </Switch>
        </Router>
      </Provider>
    </CookiesProvider>
  }

  componentDidMount() {
    JavascriptTimeAgo.locale(en)
  }
}