import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import Bookmark from '../pages/Bookmark';

const Stack = createStackNavigator();

const BookmarkNavigator = () => {
    const { i18n, t } = useTranslation();
    
    return (
        <Stack.Navigator
            initialRouteName='Bookmark'
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
                name='Bookmark'
                component={Bookmark}
                options={{ title: i18n.t('header.bookmark')}}
            />
        </Stack.Navigator>
    );
}

export default BookmarkNavigator;