import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../pages/Home';
import ProductList from '../pages/ProductList';
import MedicineProductDetail from '../pages/MedicineProductDetail';
import Pharmacy from '../pages/Pharmacy';
import PharmacyProductList from '../pages/PharmacyProductList';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='HomePage'
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
                name='HomePage'
                component={HomePage}
            />
            <Stack.Screen
                name='ProductList'
                component={ProductList}
            />
            <Stack.Screen
                name='MedicineProductDetail'
                component={MedicineProductDetail}
            />
            <Stack.Screen
                name='Pharmacy'
                component={Pharmacy}
            />
            <Stack.Screen
                name='PharmacyProductList'
                component={PharmacyProductList}
            />
        </Stack.Navigator>
    );
}

export default HomeNavigator;