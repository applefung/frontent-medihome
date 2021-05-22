import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import HomeNavigator from './home';
import ShoppingCartNavigator from './shoppingCart';
import FriendListNavigator from './friendList';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const getSource = (route: string, focused: boolean) => {
    switch (route) {
        case 'Home':
            return focused ?
                require('../assets/tab/home-activated.png') :
                require('../assets/tab/home-inactivated.png');
        case 'ShoppingCartTab':
            return focused ?
                require('../assets/tab/shoppingcart-activated.png') :
                require('../assets/tab/shoppingcart-inactivated.png');
        case 'FriendList':
            return focused ?
                require('../assets/tab/message-activated.png') :
                require('../assets/tab/message-inactivated.png');
        default:
            break
    }
}

const TabNavigator = () => {
    const { i18n, t } = useTranslation();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => (
                    <Image
                        style={{ resizeMode: 'cover', width: 28, height: 28 }}
                        source={getSource(route.name, focused)}
                    />
                ),
                tabBarOptions: {
                    activeTintColor: 'red',
                }
            })}>
            <Tab.Screen name="Home" component={HomeNavigator}  options={{ title: i18n.t('header.home')}}/>
            <Tab.Screen name="ShoppingCartTab" component={ShoppingCartNavigator}  options={{ title: i18n.t('tab.shoppingCart')}}/>
            <Tab.Screen name="FriendList" component={FriendListNavigator}  options={{ title: i18n.t('tab.friendList')}}/>
        </Tab.Navigator>
    );
}

export default TabNavigator;