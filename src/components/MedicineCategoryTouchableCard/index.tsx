import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, TouchableOpacity, Image, } from "react-native";
import { PharmacyType } from '../../types/models/Pharmacy';
import { ProductType } from '../../types/models/Product';

const MedicineCategoryTouchableCard = ({pharmacy}: any)=> {
    const { i18n, t } = useTranslation();
    const navigation = useNavigation();

    return (
        <View style={styles.pharmacyContainer}>
            <TouchableOpacity style={styles.pharmacyTitleContainer} onPress={()=>navigation.navigate('Pharmacy', { pharmacyId: pharmacy.pharmacy_id})}>
                <View style={styles.pharmacyOverallContainer}>
                    <Image style={styles.pharmayIcon} resizeMode="contain" source={require('../../assets/pharmacy/pharmacy.png')}></Image>
                    <Text>{i18n.language === 'en' ? pharmacy.name_en:pharmacy.name_cn}</Text>
                </View>
                <Image style={styles.pharmayIcon} resizeMode="contain" source={require('../../assets/right.png')}></Image>
            </TouchableOpacity>
            {
                pharmacy.products.map((productElement:ProductType, productIndex: number)=>(
                    <TouchableOpacity key={productIndex} style={styles.productContainer} onPress={()=>navigation.navigate('MedicineProductDetail', { productId: productElement.product_id})}>
                        <View style={styles.productOverallContainer}>
                            <Image style={styles.image} resizeMode="contain" source={{uri: productElement.image}}></Image>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.titleText}>{i18n.language === 'en' ? productElement.title_en:productElement.title_cn}</Text>
                                <Text style={styles.redText}>${productElement.price}</Text>
                            </View>
                        </View>
                        <View style={styles.shoppingCartAddMinusAmountContainer}>
                            <View style={styles.shoppingCartAmountContainer}>
                                <Text>x{productElement.amount}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    image: {
        resizeMode: 'contain',
        height: 100,
        width: 100,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#fafafa',
    },
    pharmacyContainer: {
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
    descriptionContainer: {
        alignItems: 'center',
        marginLeft: 10,
    },
    redText: {
        color: '#ff0000',
        fontWeight: 'bold',
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    pharmayIcon: {
        resizeMode: 'contain',
        height: 30,
        width: 30,
    },
    pharmacyTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        borderColor: '#fafafa',
        borderWidth: 1,
        margin: 10,
    },
    productOverallContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pharmacyOverallContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    shoppingCartAmountContainer: {
        backgroundColor: '#fcfcfc',
        padding: 5,
        borderRadius: 10,
        alignSelf: 'flex-start'
    },
    shoppingCartAddMinusAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    }
  });

export default MedicineCategoryTouchableCard;