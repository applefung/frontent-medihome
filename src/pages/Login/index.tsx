import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Platform, NativeModules, TouchableOpacity, Alert, Image } from "react-native";
import { TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authentication';
import Spinner from 'react-native-loading-spinner-overlay';

const Login = () => {
    const { i18n, t } = useTranslation();
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const onSubmitLogin = async () => {
        if(!emailText || !passwordText){
            Alert.alert(
                i18n.t('error'),
                i18n.t('pleaseFillIn'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
            return;
        }
        setIsLoading(true);
        dispatch(login({email: emailText, password: passwordText})).then(()=>{
            setIsLoading(false);
            Alert.alert(
                i18n.t('success'),
                i18n.t('login.loginSuccess'),
                [
                  {
                    text: i18n.t('ok'),
                    onPress: () => navigation.navigate("HomePage"),
                    style: "cancel",
                  },
                ],
              );
        })
        setIsLoading(false);
    };

    return (
        <View style={styles.screen}>
            {
                isLoading?
                <Spinner
                    visible={isLoading}
                    textContent={i18n.t('loading')}
                    textStyle={styles.spinnerTextStyle}
                />:null
            }
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode="contain" source={require('../../assets/icon.png')}></Image>
            </View>
            <View style={styles.textInputFieldContainer}>
                <View style={styles.smallIconContainer}>
                    <Image style={styles.smallIcon} resizeMode="contain" source={require('../../assets/authentication/email.png')}></Image>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        label={'Email 電郵'}
                        value={emailText}
                        onChangeText={text => setEmailText(text)}
                        theme={{
                            colors: {
                                        placeholder: '#00d2c3', text: '#00d2c3', primary: '#00d2c3',
                                        background: '#ffffff'
                                }
                            }}
                    />
                </View>
                <View style={styles.emptyContainer}/>
            </View>
            <View style={styles.textInputFieldContainer}>
                <View style={styles.smallIconContainer}>
                    <Image style={styles.smallIcon} resizeMode="contain" source={require('../../assets/authentication/password.png')}></Image>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        label={'Password 密碼'}
                        value={passwordText}
                        onChangeText={text => setPasswordText(text)}
                        theme={{
                            colors: {
                                        placeholder: '#00d2c3', text: '#00d2c3', primary: '#00d2c3',
                                        background: '#ffffff'
                                }
                            }}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.emptyContainer}/>
            </View>

            <TouchableOpacity style={styles.submitContainer} onPress={onSubmitLogin}>
                <Text style={styles.submitText}>{i18n.t('submit')}</Text>
            </TouchableOpacity>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.forgotPasswordContainer} onPress={()=>{navigation.navigate("ForgotPassword");}}>
                    <Text style={styles.forgotPasswordText}>{i18n.t('login.forgotPassword')}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUpContainer} onPress={()=>{navigation.navigate("SignUp");}}>
                    <Text style={styles.signUpText}>{i18n.t('login.signUp')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center'
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        resizeMode: 'contain',
        height: 80
    },
    smallIcon: {
        resizeMode: 'contain',
        height: 30
    },
    smallIconContainer: {
        width: '30%',
        alignItems: 'flex-start'
    },
    textInputContainer: {
        width: '70%',
        alignContent:'flex-start',
    },
    emptyContainer: {
        width: '10%',
        marginLeft: 30,
    },
    textInputFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    submitContainer: {
        marginVertical: 10,
        backgroundColor: '#00d2c3',
        borderRadius: 10,
        padding: 10,
        width: '60%'
    },
    submitText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    bottomContainer: {
        flexDirection: 'row'
    },
    forgotPasswordContainer: {
        flex: 1
    },
    signUpContainer: {
        flex: 1
    },
    forgotPasswordText: {
        textAlign: 'center',
        color: '#00d2c3'
    },
    signUpText: {
        textAlign: 'center',
        color: '#00d2c3'
    },
});
export default Login;