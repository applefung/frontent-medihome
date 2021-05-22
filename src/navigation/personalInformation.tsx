import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import PersonalInformation from '../pages/PersonalInformation';
import EditPersonalInformation from '../pages/EditPersonalInformation';

const Stack = createStackNavigator();

const PersonalInformationNavigator = () => {
    const { i18n, t } = useTranslation();
    
    return (
        <Stack.Navigator
            initialRouteName='PersonalInformation'
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
                name='PersonalInformation'
                component={PersonalInformation}
                options={{ title: i18n.t('header.personalInformation')}}
            />
            <Stack.Screen
                name='EditPersonalInformation'
                component={EditPersonalInformation}
                options={{ title: i18n.t('header.editPersonalInformation')}}
            />
        </Stack.Navigator>
    );
}

export default PersonalInformationNavigator;