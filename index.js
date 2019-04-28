import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {AppRegistry} from 'react-native';
import store from './store';
import AppNavigator from './app/router';
import {name as appName} from './app.json';


export default class App extends Component {
    render() {
      const Layout = AppNavigator;
      return (
        <Provider store={store}>
          <Layout />
        </Provider>
      );
    }
  }


AppRegistry.registerComponent(appName, () => App);