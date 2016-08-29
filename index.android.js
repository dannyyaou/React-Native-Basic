/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
if (!window.navigator.userAgent) {
  window.navigator.userAgent = "react-native";
}


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Main from './main/main';

class ReactNativeBasic extends Component {
  render() {
    return (
      <Main device="android"/>
    );
  }
}



AppRegistry.registerComponent('ReactNativeBasic', () => ReactNativeBasic);
