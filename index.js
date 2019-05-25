import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import AppNavigator from './app/router';
import {name as appName} from './app.json';


export default class App extends Component {
    render() {
      const Layout = AppNavigator;
      return (
        <Layout />
      );
    }
  }


AppRegistry.registerComponent(appName, () => App);