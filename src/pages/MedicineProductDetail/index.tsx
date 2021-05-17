import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, Platform, NativeModules, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/product';
import type { RootState } from '../../store/store';
import Spinner from 'react-native-loading-spinner-overlay';
import { getPharmacy } from '../../actions/pharmacy';
import { PharmacyType } from '../../types/models/Pharmacy';
import { useNavigation } from '@react-navigation/core';

const MedicineProductDetail = ({route}: any) => {
    const navigation = useNavigation();
    const { i18n, t } = useTranslation("en");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const productId = route.params.productId;
    const products:any = useSelector<RootState>(state=>state.Products.Products);
    const pharmacyId = productId.split('-')[0];
    const availablePharmacy:any = useSelector<RootState>(state => state.Pharmacy.Pharmacy);
    const foundPharmacy = availablePharmacy.find((element:PharmacyType)=>element.pharmacy_id === parseInt(pharmacyId));

    useEffect(()=>{
        init();
    }, [])

    const init = async () => {
        setIsLoading(true);
        await dispatch(getProduct("productId="+productId));
        // await dispatch(getPharmacy("pharmacyId="+pharmacyId));
        setIsLoading(false);
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
            <View style={styles.productContainer}>
                <Image style={styles.image} resizeMode="contain" source={{uri: products[0].image}}></Image>
                <Text  style={styles.titleText}>{i18n.language==='en'?products[0].title_en:products[0].title_cn}</Text>
                <Text  style={styles.priceText}>${products[0].price}</Text>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{i18n.language==='en'?products[0].description_en:products[0].description_cn}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.pharmacyContainer} onPress={()=>navigation.navigate('Pharmacy', {pharmacyId: pharmacyId})}>
                <Image style={styles.pharmacyImage} resizeMode="contain" source={{uri: foundPharmacy.image}}></Image>
                <Text>{i18n.language==='en'?foundPharmacy.name_en:foundPharmacy.name_cn}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300,
        marginTop: 10
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    priceText: {
        color: '#ff0000',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 10
    },
    descriptionText: {
        textAlign: 'center',
    },
    descriptionContainer: {
        margin: 15,
        padding: 10
    },
    productContainer: {
        borderWidth: 1,
        borderColor: '#000000',
        margin: 15,
        borderRadius: 20,
    },
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
    }
  });

export default MedicineProductDetail;