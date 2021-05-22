import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/product';
import type { RootState } from '../../store/store';
import Spinner from 'react-native-loading-spinner-overlay';
import { addToShoppingCart } from '../../actions/shoppingCart';
import { PharmacyType } from '../../types/models/Pharmacy';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { ProductType } from '../../types/models/Product';

const MedicineProductDetail = ({route}: any) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { i18n, t } = useTranslation("en");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const productId = route.params.productId;
    const products:any = useSelector<RootState>(state=>state.Products.Products);
    const pharmacyId = productId.split('-')[0];
    const availablePharmacy:any = useSelector<RootState>(state => state.Pharmacy.Pharmacy);
    const foundPharmacy = availablePharmacy.find((element:PharmacyType)=>element.pharmacy_id === parseInt(pharmacyId));
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const availableProduct = products.filter((element: ProductType) => element.product_id === productId);

    useEffect(()=>{
        init();
    }, [])

    const init = async () => {
        setIsLoading(true);
        await dispatch(getProduct("productId="+productId));
        // await dispatch(getPharmacy("pharmacyId="+pharmacyId));
        setIsLoading(false);
    };

    const addToShoppingCartFunction = async() => {
        // check jwt
        if(availableLoginUser.Token.length === 0){
            Alert.alert(
                i18n.t('medicineProductDetail.noLogin'),
                i18n.t('medicineProductDetail.pleaseLogin'),
                [
                  {
                    text: i18n.t('ok'),
                    onPress: ()=>{navigation.navigate('Authentication', { screen: 'Login' });}
                  },
                  {
                    text: i18n.t('cancel'),
                    style: "cancel",
                  },
                ],
              );
            return;
        };

        setIsLoading(true);
        dispatch(addToShoppingCart({customerUserId: availableLoginUser.CustomerUser.customer_user_id, productId: productId, type: 1}, availableLoginUser.Token)).then(() => {
            Alert.alert(
                i18n.t('success'),
                i18n.t('medicineProductDetail.addOneSuccess'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
    
            setIsLoading(false);
        });

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
            {
                availableProduct.length ?
                <View style={styles.productContainer}>
                    <Image style={styles.image} resizeMode="contain" source={{uri: availableProduct[0].image}}></Image>
                    <Text style={styles.titleText}>{i18n.language==='en'?availableProduct[0].title_en:availableProduct[0].title_cn}</Text>
                    <Text style={styles.priceText}>${availableProduct[0].price}</Text>
                    <View style={styles.descriptionContainer}>
                        <Text style={styles.descriptionText}>{i18n.language==='en'?availableProduct[0].description_en:availableProduct[0].description_cn}</Text>
                    </View>
                </View>
                :<Text style={styles.noResultText}>{i18n.t('noResult')}</Text>
            }

            <TouchableOpacity style={styles.pharmacyContainer} onPress={()=>navigation.navigate('Pharmacy', {pharmacyId: pharmacyId})}>
                <Image style={styles.pharmacyImage} resizeMode="contain" source={{uri: foundPharmacy.image}}></Image>
                <Text>{i18n.language==='en'?foundPharmacy.name_en:foundPharmacy.name_cn}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addToShoppingCartContainer} onPress={addToShoppingCartFunction}>
                <Image style={styles.addImage} resizeMode="contain" source={require('../../assets/product/add.png')}></Image>
                <Text>{i18n.t('medicineProductDetail.addToShoppingCart')}</Text>
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
    },
    addImage: {
        resizeMode: 'contain',
        height: 30,
        width: '10%',
    },
    addToShoppingCartContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        margin: 15,
        borderRadius: 20,
    },
    noResultText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    }
  });

export default MedicineProductDetail;