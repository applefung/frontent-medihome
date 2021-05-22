import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Image, TouchableOpacity, Button, ScrollView, Alert } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { TextInput } from 'react-native-paper';
import { forgotPasswordSendVerificationCodeService, forgotPasswordService } from '../../services/authentication';

const ForgotPassword = () => {
    const { i18n, t } = useTranslation();
    const navigation = useNavigation();
    const TIMER_MAX = 5;
    const PASSWORD_MIN_LENGTH = 6;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [confirmPasswordText, setConfirmPasswordText] = useState('');
    const [verificationCodeText, setVerificationCodeText] = useState('');
    const [timer, setTimer] = useState(TIMER_MAX);
    const [isActive, setIsActive] = useState(false);
    const [clockCall, setClockCall] = useState<any>("");
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailFormatWrong, setIsEmailFormatWrong] = useState(false);
    const [isPasswordFormatWrong, setIsPasswordFormatWrong] = useState(false);
    const [isConfirmPasswordFormatWrong, setIsConfirmPasswordFormatWrong] = useState(false);

    
    const onSubmit = async() => {
        // check email format
        if(isEmailFormatWrong){
            Alert.alert(
                i18n.t('error'),
                i18n.t('forgotPassword.emailFormatWrong'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
            return;
        }
        // check password length and confirm password length
        if(isEmailFormatWrong || isConfirmPasswordFormatWrong){
            Alert.alert(
                i18n.t('error'),
                i18n.t('forgotPassword.passwordFormatWrong'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
            return;
        }

        // compare password
        if(passwordText !== confirmPasswordText){
            Alert.alert(
                i18n.t('error'),
                i18n.t('forgotPassword.passwordNotMatch'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
            return;
        }
        
        if(emailText.length === 0 || passwordText.length === 0 || confirmPasswordText.length === 0 || verificationCodeText.length === 0){
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
        const result = await forgotPasswordService({email: emailText, password: passwordText, verificationCode: verificationCodeText}).catch((error: Error) => {
            Alert.alert(
                i18n.t('error'),
                i18n.t('systemError'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
        });
 
        setIsLoading(false);
        if(result === "E0000"){
            Alert.alert(
                i18n.t('success'),
                i18n.t('forgotPassword.sendSuccess'),
                [
                  {
                    text: i18n.t('ok'),
                    onPress: () => navigation.navigate("HomePage"),
                    style: "cancel",
                  },
                ],
              );
            navigation.navigate("HomePage");
        }
        else{
            Alert.alert(
                i18n.t('error'),
                i18n.t('forgotPassword.verificationCodeWrong'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
        }
    };

    const onSubmitSendVerificationCode = async ()=> {
        setClockCall(setInterval(() => {
            countDown();
          }, 1000));
        setIsLoading(true);
        const result = await forgotPasswordSendVerificationCodeService({email: emailText}).catch((error: Error) => {
            Alert.alert(
                i18n.t('error'),
                i18n.t('systemError'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
        });

        if(result === "E0000"){
            Alert.alert(
                i18n.t('success'),
                i18n.t('forgotPassword.sendSuccess'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
        }
        setIsLoading(false);

    };

    const countDown = () => {
        setTimer((prevState)=> prevState-1)
    }

    useEffect(()=>{
        if(timer === 0){
            clearInterval(clockCall)
            setTimer(TIMER_MAX);
            setIsActive(false);
        }
        else if(timer !== 0 && timer !== TIMER_MAX ){
            setIsActive(true);
        }

    },[timer])

    const handleEmailText = (text:string) => {

        if(!emailRegex.test(text.toLowerCase())){
            setIsEmailFormatWrong(true);
        }
        else{
            setIsEmailFormatWrong(false);
        }
        setEmailText(text);
    };
    
    
    const handlePasswordText = (text:string) => {
        if(text.length < PASSWORD_MIN_LENGTH ){
            setIsPasswordFormatWrong(true);
        }
        else{
            setIsPasswordFormatWrong(false);
        }

        setPasswordText(text);
    };

    const handleConfirmPasswordText = (text:string) => {
        if(text.length < PASSWORD_MIN_LENGTH ){
            setIsConfirmPasswordFormatWrong(true);
        }
        else{
            setIsConfirmPasswordFormatWrong(false);
        }

        setConfirmPasswordText(text);
    };

    return (
        <ScrollView>
            {
                isLoading?
                <Spinner
                    visible={isLoading}
                    textContent={i18n.t('loading')}
                    textStyle={styles.spinnerTextStyle}
                />:null
            }
            <View style={styles.screen}>
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
                            onChangeText={text => handleEmailText(text)}
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
                
                {
                    isEmailFormatWrong?
                    <View>
                        <Text style={styles.errorText}>{i18n.t('signUp.emailFormatWrong')}</Text>
                    </View>
                    : null
                }
                                
                <View style={styles.textInputFieldContainer}>
                    <View style={styles.smallIconContainer}>
                        <Image style={styles.smallIcon} resizeMode="contain" source={require('../../assets/authentication/password.png')}></Image>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            label={'Password 密碼'}
                            value={passwordText}
                            onChangeText={text => handlePasswordText(text)}
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
                
                {
                    isPasswordFormatWrong?
                    <View>
                        <Text style={styles.errorText}>{i18n.t('forgotPassword.passwordFormatWrong')}</Text>
                    </View>
                    : null
                }

                <View style={styles.textInputFieldContainer}>
                    <View style={styles.smallIconContainer}>
                        <Image style={styles.smallIcon} resizeMode="contain" source={require('../../assets/authentication/password.png')}></Image>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            label={'Confirm Password 確認密碼'}
                            value={confirmPasswordText}
                            onChangeText={text => handleConfirmPasswordText(text)}
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
                
                {
                    isConfirmPasswordFormatWrong?
                    <View>
                        <Text style={styles.errorText}>{i18n.t('forgotPassword.passwordFormatWrong')}</Text>
                    </View>
                    : null
                }

                <View style={styles.textInputFieldContainer}>
                    <View style={styles.smallIconContainer}>
                        <Image style={styles.smallIcon} resizeMode="contain" source={require('../../assets/authentication/verification-code.png')}></Image>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            label={'Verification Code 驗證碼'}
                            value={verificationCodeText}
                            onChangeText={text => setVerificationCodeText(text)}
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

                <View style={styles.verificationCodeContainer}>
                    <Button color={"#ffffff"} title={timer === TIMER_MAX ? i18n.t('forgotPassword.sendVerificationCode') : timer.toString() } disabled={isActive} onPress={onSubmitSendVerificationCode}/>
                </View>

                <TouchableOpacity style={styles.submitContainer} onPress={onSubmit}>
                    <Text style={styles.submitText}>{i18n.t('submit')}</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
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
    verificationCodeContainer: {
        backgroundColor: '#00d2c3',
        borderRadius: 10,
        marginTop: 10,
    },
    errorText: {
        color: '#ff0000',
        marginTop: 5,
    }
});

export default ForgotPassword;