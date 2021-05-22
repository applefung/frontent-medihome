import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useIsFocused, useNavigation } from '@react-navigation/core';

const PersonalInformation = () => {
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const isFocused = useIsFocused();
    const { i18n, t } = useTranslation();
    const navigation = useNavigation();

    useEffect(()=> {
        if(availableLoginUser.Token.length === 0){
            Alert.alert(
                i18n.t('medicineProductDetail.noLogin'),
                i18n.t('medicineProductDetail.pleaseLogin'),
                [
                  {
                    text: i18n.t('ok'),
                    onPress: ()=>{navigation.navigate('Authentication', { screen: 'Login' });}
                  },
                ],
              );
        }
    }, [isFocused]);

    return (
        <View>
            <TouchableOpacity style={styles.nameContainer}>
                <Text style={styles.keyText}>{i18n.t('personalInformation.email')}</Text>
                <Text style={styles.valueText}>{availableLoginUser.CustomerUser.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.nameContainer} onPress={()=>navigation.navigate('EditPersonalInformation', {key: i18n.t('personalInformation.name'), value: availableLoginUser.CustomerUser.name})}>
                <Text style={styles.keyText}>{i18n.t('personalInformation.name')}</Text>
                <View style={styles.editContainer}>
                    <Text style={styles.valueText}>{availableLoginUser.CustomerUser.name}</Text>
                    <Image style={styles.pharmayIcon} resizeMode="contain" source={require('../../assets/right.png')}></Image>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    keyText: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1
    },
    valueText: {
        fontSize: 14,
    },
    pharmayIcon: {
        resizeMode: 'contain',
        height: 30,
        width: 30,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    }
});

export default PersonalInformation;