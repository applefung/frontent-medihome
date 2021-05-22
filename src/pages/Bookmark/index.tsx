import { useNavigation } from '@react-navigation/core';
import React, { Component, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import _ from 'lodash';
import { PharmacyType } from '../../types/models/Pharmacy';
import ProductCard from '../../components/ProductCard';

const Bookmark = () => {
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const availablePharmacy:any = useSelector<RootState>(state => state.Pharmacy.Pharmacy);
    const { i18n, t } = useTranslation();
    const bookmark = availableLoginUser.CustomerUser.bookmark;
    const [bookmarkedPharmacy, setBookmarkedPharmacy] = useState([]);

    const navigation = useNavigation();
    useEffect(()=>{
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
            const bookmarkArray = _.split(bookmark, ",");
            const tempBookmarkArray:any = []
            for(let i=0; i<bookmarkArray.length; i++){
                const temp = availablePharmacy.filter((element: PharmacyType) => element.pharmacy_id === parseInt(bookmarkArray[i]));
                tempBookmarkArray.push(temp);
            }
            setBookmarkedPharmacy(tempBookmarkArray);
            console.log('bookmark', bookmarkedPharmacy)
        }
    }, []);

    return(
        <View>
            {
                bookmarkedPharmacy.length?
                bookmarkedPharmacy.map((element: any, index: number) => (
                    <TouchableOpacity key={index} style={styles.pharmacyContainer} onPress={()=>navigation.navigate('Pharmacy', {pharmacyId: element[0].pharmacy_id})}>
                        <Image style={styles.pharmacyImage} resizeMode="contain" source={{uri: element[0].image}}></Image>
                        <Text>{i18n.language==='en'?element[0].name_en:element[0].name_cn}</Text>
                    </TouchableOpacity>
                ))
                :null
            }
        </View>
    );
};

const styles = StyleSheet.create({
    pharmacyImage: {
        width: "50%",
        height: 80,
    },
    pharmacyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#000000",
        margin: 15,
        padding: 10,
        borderRadius: 20,
    },
});
export default Bookmark;