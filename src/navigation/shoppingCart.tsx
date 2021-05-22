import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import ShoppingCart from '../pages/ShoppingCart';
import MedicineProductDetail from '../pages/MedicineProductDetail';
import Pharmacy from '../pages/Pharmacy';
import ConfirmOrder from '../pages/ConfirmOrder';

const Stack = createStackNavigator();

const ShoppingCartNavigator = () => {
    const { i18n, t } = useTranslation();
    
    return (
        <Stack.Navigator
            initialRouteName='ShoppingCart'
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
                name='ShoppingCart'
                component={ShoppingCart}
                options={{ title: i18n.t('header.shoppingCart')}}
            />
            <Stack.Screen
                name='MedicineProductDetail'
                component={MedicineProductDetail}
                options={{ title: i18n.t('header.medicineProductDetail')}}
            />
            <Stack.Screen
                name='Pharmacy'
                component={Pharmacy}
                options={{ title: i18n.t('header.pharmacy')}}
            />
            <Stack.Screen
                name='ConfirmOrder'
                component={ConfirmOrder}
                options={{ title: i18n.t('header.confirmOrder')}}
            />
        </Stack.Navigator>
    );
}

export default ShoppingCartNavigator;