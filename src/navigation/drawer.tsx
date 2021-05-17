import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './tab';
import HomeNavigator from './home';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ()=> {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={TabNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default DrawerNavigator;