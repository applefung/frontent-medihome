import React, {Component} from 'react';
import { useTranslation } from 'react-i18next';
import {Text, View, Button, Platform, NativeModules, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../actions/authentication';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : StatusBarManager.HEIGHT;

const CustomDrawer = (props: any) => {
    const { i18n, t } = useTranslation();
    const dispatch = useDispatch();
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);

    const onSubmitLogout = ()=> {
        dispatch(logout());
        Alert.alert(
            i18n.t('success'),
            i18n.t('logout.logoutSuccess'),
            [
              {
                text: i18n.t('ok'),
                onPress: ()=>props.navigation.navigate('HomePage'),
                style: "cancel",
              },
            ],
      );
    };

  return (
    <View style={styles.screen}>
        {
            availableLoginUser.Token.length ?
            <TouchableOpacity style={styles.loginContainer} onPress={onSubmitLogout}>
                <Image style={styles.image} resizeMode="contain" source={require('../assets/user/user-activated.png')}></Image>
                <View style={styles.userInfoTextContainer}>
                    <Text style={styles.userInfoText}>{i18n.t('drawer.email')}: {availableLoginUser.CustomerUser.email}</Text>
                    <Text style={styles.userInfoText}>{i18n.t('drawer.name')}: {availableLoginUser.CustomerUser.name}</Text>
                </View>
                <Text style={styles.loginText}>{i18n.t('drawer.logout')}</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.loginContainer} onPress={()=>{props.navigation.navigate('Authentication')}}>
                <Image style={styles.image} resizeMode="contain" source={require('../assets/user/user-inactivated.png')}></Image>
                <Text style={styles.loginText}>{i18n.t('drawer.login')}</Text>
            </TouchableOpacity>
            
        }
       
        <View style={styles.itemContainer}>
            <Button
                title={i18n.t('drawer.home')}
                onPress={() => props.navigation.navigate('HomePage')}
                color={"#00d2c3"}
            />
        </View>
        <View style={styles.itemContainer}>
            <Button
                title={"My Orders"}
                onPress={() => props.navigation.navigate('MyOrder')}
                color={"#00d2c3"}
            />
        </View>
        <View style={styles.itemContainer}>
            <Button
                title={"Personal Information"}
                onPress={() => props.navigation.navigate('PersonalInformation')}
                color={"#00d2c3"}
            />
        </View>
        <View style={styles.itemContainer}>
            <Button
                title={"Bookmark"}
                onPress={() => props.navigation.navigate('Bookmark')}
                color={"#00d2c3"}
            />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        marginTop: STATUSBAR_HEIGHT,
    },
    loginContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
    },
    userInfoTextContainer: {
        marginTop: 10,
        alignItems: 'center'
    },
    userInfoText: {
        fontSize: 16,
    },
    image: {
        resizeMode: 'contain',
        height: 100,
    },
    itemContainer: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#f0f0f0',
        paddingVertical: 5
    }
  });

export default CustomDrawer;