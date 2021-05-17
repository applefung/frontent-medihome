import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PharmacyType } from '../../types/models/Pharmacy';
import { ProductType } from '../../types/models/Product';

type ProductCardProps = {
    product: ProductType;
};

const MedicineProductCard = ({product}: ProductCardProps)=> {
    const { i18n, t } = useTranslation("en");
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('MedicineProductDetail', {productId: product.product_id})}>
            {/*// @ts-ignore */}
            <Image style={styles.image} resizeMode="contain" source={{uri: product.image}}></Image>
            <View>
                <View>
                    <Text style={styles.productNameText}>{i18n.language==='en'?product.title_en:product.title_cn}</Text>
                </View>
                <View style={styles.productContainer}>
                    <Text  style={styles.descriptionText} numberOfLines={5}>{i18n.language==='en'?product.description_en:product.description_cn}</Text>
                </View>
                <View style={styles.productContainer}>
                    <Text style={styles.redText}>${product.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    productContainer:{
        flexDirection: 'row'
    },
    oneProductContainer: {
        width: "25%",
        alignItems:'center'
    },
    image: {
        height: 100,
        width: '40%',
        resizeMode: 'contain',
    },
    productImage: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    redText: {
        color: '#ff0000',
        fontSize: 15,
        fontWeight: 'bold'
    },
    productNameText: {
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 16,
    },
    descriptionText: {
        width: '70%',
        marginVertical: 5
    }
});

export default MedicineProductCard;