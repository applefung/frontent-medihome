import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/pages/Home';
import { store } from './src/store/store';
import { Provider } from 'react-redux';
import NavigationContainer from './src/navigation/container';
import DrawerNavigator from './src/navigation/drawer';

export default function App() {
  return (
    <Provider store={store}>
      <DrawerNavigator />
      {/* <Home /> */}
    </Provider>
  );
}


