import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../pages/Home';
import ProductList from '../pages/ProductList';
import MedicineProductDetail from '../pages/MedicineProductDetail';
import Pharmacy from '../pages/Pharmacy';
import PharmacyProductList from '../pages/PharmacyProductList';
import ResultList from '../pages/ResultList';
import Chat from '../pages/Chat';
import AddComment from '../pages/AddComment';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    const { i18n, t } = useTranslation();
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
                options={{ title: i18n.t('header.home')}}
            />
            <Stack.Screen
                name='ProductList'
                component={ProductList}
                options={{ title: i18n.t('header.productList')}}
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
                name='PharmacyProductList'
                component={PharmacyProductList}
                options={{ title: i18n.t('header.pharmacyProductList')}}
            />
            <Stack.Screen
                name='ResultList'
                component={ResultList}
                options={{ title: i18n.t('header.resultList')}}
            />
            <Stack.Screen
                name='Chat'
                component={Chat}
                options={{ title: i18n.t('header.chat')}}
            />
            <Stack.Screen
                name='AddComment'
                component={AddComment}
                options={{ title: i18n.t('header.addComment')}}
            />
        </Stack.Navigator>
    );
}

export default HomeNavigator;