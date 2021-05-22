import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
    const { i18n, t } = useTranslation();
    
    return (
        <Stack.Navigator
            initialRouteName='Login'
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
                name='Login'
                component={Login}
                options={{ title: i18n.t('header.login')}}
            />
            <Stack.Screen
                name='ForgotPassword'
                component={ForgotPassword}
                options={{ title: i18n.t('header.forgotPassword')}}
            />
            <Stack.Screen
                name='SignUp'
                component={SignUp}
                options={{ title: i18n.t('header.signUp')}}
            />
        </Stack.Navigator>
    );
}

export default AuthenticationNavigator;