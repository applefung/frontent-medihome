import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PharmacyType } from '../../types/models/Pharmacy';
import { ProductType } from '../../types/models/Product';

type ProductCardProps = {
    product: PharmacyType;
};

const ProductCard = ({product}: ProductCardProps)=> {
    const { i18n, t } = useTranslation("en");
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('Pharmacy', {pharmacyId: product.pharmacy_id})}>
            {/*// @ts-ignore */}
            <Image style={styles.image} resizeMode="contain" source={{uri: product.image}}></Image>
            <View>
                <View>
                    <Text style={styles.productNameText}>{i18n.language==='en'?product.name_en:product.name_cn}</Text>
                </View>
                <View style={styles.productContainer}>
                    {
                        product.products.map((element:ProductType, index:number) => 
                        <View style={styles.oneProductContainer} key={index}>
                            <Image style={styles.productImage} resizeMode="contain" source={{uri: element.image}}></Image>
                            <Text>{i18n.language==='en'?element.title_en:element.title_cn}</Text>
                            <Text style={styles.redText}>${element.price}</Text>
                        </View>
                        )
                    }
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
        color: '#ff0000'
    },
    productNameText: {
        fontWeight: 'bold',
        marginLeft: 10,
    }
});

export default ProductCard;