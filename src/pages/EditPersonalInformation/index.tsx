import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { editPersonalInformation } from '../../actions/customerUser';
import { RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/core';

const  EditPersonalInformation = ({route}: any)=> {
    const { i18n, t } = useTranslation("en");
    const { key, value } =  route.params;
    const dispatch = useDispatch();
    const [text, setText] = useState(value);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);

    const handleSubmit = async () => {
        setIsLoading(true);
        dispatch(editPersonalInformation({key: key, value: text, customerUserId: availableLoginUser.CustomerUser.customer_user_id},availableLoginUser.Token)).then(() => {
            setIsLoading(false);
            Alert.alert(
                i18n.t('success'),
                i18n.t('editPersonalInformation.editSuccess'),
                [
                  {
                    text: i18n.t('ok'),
                    onPress: ()=>navigation.navigate("PersonalInformation"),
                    style: "cancel",
                  },
                ],
              );
        });
        navigation.navigate("PersonalInformation");
    }

    return (
        <View>
             {
                isLoading?
                <Spinner
                    visible={isLoading}
                    textContent={i18n.t('loading')}
                    textStyle={styles.spinnerTextStyle}
                />:null
            }
            <Text style={styles.title}>
                {key}
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={value => setText(value)}
                value={text}
            />
            <View style={styles.button}>
                <Button
                    onPress={()=> {handleSubmit()}}
                    title={i18n.t('submit')}
                    color="#0275d8"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
    button: {
        margin: 20,
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '900',
        margin: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    }
  });

export default EditPersonalInformation;