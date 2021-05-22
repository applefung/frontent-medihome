import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import MyOrder from '../pages/MyOrder';

const Stack = createStackNavigator();

const MyOrderNavigator = () => {
    const { i18n, t } = useTranslation();
    
    return (
        <Stack.Navigator
            initialRouteName='MyOrder'
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#00d2c3",
                    shadowOpacity: 0,
                    elevation: 0,
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    textAlign: "center",
                    alignSelf: "center",
                    fontSize: 18,
                    color: "#fff",
                    fontWeight: "bold",
                },
            }}
        >
            <Stack.Screen
                name='MyOrder'
                component={MyOrder}
                options={{ title: i18n.t('header.myOrder')}}
            />
        </Stack.Navigator>
    );
}

export default MyOrderNavigator;