import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Alert, Image, } from "react-native";
import { PharmacyType } from '../../types/models/Pharmacy';
import { ProductType } from '../../types/models/Product';

const PharmacyMedicineCard = (pharmacy: any)=> {
    const { i18n, t } = useTranslation();
    return (
        <View style={styles.pharmacyContainer}>
            <View style={styles.pharmacyTitleContainer}>
                <View style={styles.pharmacyOverallContainer}>
                    <Image style={styles.pharmayIcon} resizeMode="contain" source={require('../../assets/pharmacy/pharmacy.png')}></Image>
                    <Text>{i18n.language === 'en' ? pharmacy.pharmacy.name_en:pharmacy.pharmacy.name_cn}</Text>
                </View>
            </View>
            {
                pharmacy.pharmacy.products.map((productElement:ProductType, productIndex: number)=>(
                    <View key={productIndex} style={styles.productContainer}>
                        <View style={styles.productOverallContainer}>
                            <Image style={styles.image} resizeMode="contain" source={{uri: productElement.image}}></Image>
                            <View style={styles.descriptionContainer}>
                                <Text style={styles.titleText}>{i18n.language === 'en' ? productElement.title_en:productElement.title_cn}</Text>
                                <Text style={styles.redText}>${productElement.price}</Text>
                            </View>
                        </View>
                        <View style={styles.shoppingCartAddMinusAmountContainer}>
                            <View style={styles.shoppingCartAmountContainer}>
                                <Text>x{productElement.shoppingCartAmount}</Text>
                            </View>
                        </View>
                    </View>
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
        flexWrap: 'wrap'
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

export default PharmacyMedicineCard;