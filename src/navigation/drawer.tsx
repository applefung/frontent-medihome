import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './tab';
import CustomDrawer from './CustomDrawer';
import AuthenticationNavigator from './authentication';
import MyOrderNavigator from './myOrder';
import PersonalInformationNavigator from './personalInformation';
import BookmarkNavigator from './bookmark';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ()=> {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home"  drawerContent={(props) => <CustomDrawer {...props}/>}>
                <Drawer.Screen name="Home" component={TabNavigator} />
                <Drawer.Screen name="Authentication" component={AuthenticationNavigator} />
                <Drawer.Screen name="MyOrder" component={MyOrderNavigator} />
                <Drawer.Screen name="PersonalInformation" component={PersonalInformationNavigator} />
                <Drawer.Screen name="Bookmark" component={BookmarkNavigator} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default DrawerNavigator;