import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Button, ScrollView, Alert, Platform, TouchableOpacityComponent } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getFriendList } from '../../actions/chat';
import { RootState } from '../../store/store';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { ChatType } from '../../types/models/Chat';

const FriendList = () => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const availableChat:any = useSelector<RootState>(state=>state.Chat.Chat);
    const [isLoading, setIsLoading] = useState(false);

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
        else{
            setIsLoading(true);
            dispatch(getFriendList(availableLoginUser.CustomerUser.customer_user_id, availableLoginUser.Token)).then(()=> {
                setIsLoading(false);
            })
        }
    }, [isFocused]);

    return(
        <View>
            {
                isLoading?
                <Spinner
                    visible={isLoading}
                    textContent={i18n.t('loading')}
                    textStyle={styles.spinnerTextStyle}
                />:null
            }
            {
                availableChat.length ?
                availableChat.map((element: ChatType, index: number) => (
                    <TouchableOpacity key={index} style={styles.oneFriendContainer} onPress={()=>{navigation.navigate('Chat', {pharmacyId: element.pharmacy.pharmacy_id, roomId: element.room_id})}}>
                        <Image style={styles.image} resizeMode="contain" source={{uri: element.pharmacy.image}}></Image>
                        <Text>
                            {i18n.language === 'en'?element.pharmacy.name_en:element.pharmacy.name_cn}
                        </Text>
                    </TouchableOpacity>
                ))
                :null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    image: {
        resizeMode: 'contain',
        height: 100,
        width: 100,
        marginRight: 10,
    },
    oneFriendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 20,
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
    }
});

export default FriendList;
