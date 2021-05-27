import { useIsFocused, useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, ScrollView, Alert, Image, TouchableOpacity, Button } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getShoppingCart } from '../../actions/shoppingCart';
import { RootState } from '../../store/store';
import { PharmacyType } from '../../types/models/Pharmacy';
import { ProductType } from '../../types/models/Product';
import { Checkbox } from 'react-native-paper';
import _ from 'lodash';
import { addToShoppingCart } from '../../actions/shoppingCart';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFocusEffect } from '@react-navigation/native';

const ShoppingCart = () => {
    const usePrevious = (value: any) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const { i18n, t } = useTranslation();
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const availablePharmacy:any = useSelector<RootState>(state=>state.ShoppingCart.Pharmacy);
    const [currentPharmacy, setCurrentPharmacy] = useState(availablePharmacy);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const [sumOfProductPrice, setSumOfProductPrice] = useState(0);
    const availableShoppingCartItems = availableLoginUser.CustomerUser.shopping_cart_items;
    const prevPharmacy = usePrevious(availablePharmacy);
    const prevLoginUser = usePrevious(availableLoginUser);

    // useFocusEffect(() => {
    //     init();
    // });

    useEffect(() => {
        init();
    }, [isFocused]);


    useEffect(() => {
        if(!_.isEqual(prevPharmacy, availablePharmacy) || !_.isEqual(prevLoginUser, availableLoginUser)){
            init();
        }
    }, [availablePharmacy, availableLoginUser]);

    const init = async ()=> {
        setSumOfProductPrice(0);
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
            dispatch(getShoppingCart(availableLoginUser.CustomerUser.customer_user_id, availableLoginUser.Token)).then(()=>{
                setIsLoading(false);
            });

            let tempPharmacy = _.cloneDeep(availablePharmacy);
            if(availablePharmacy.length){
                tempPharmacy.forEach((element: PharmacyType) => {
                    element.isSelected = false;
                    element.products.forEach((productElement: ProductType) => {
                        productElement.isSelected = false;
                        const keys = Object.keys(availableShoppingCartItems);
                        for (let i = 0; i < keys.length; i++) {
                            const key = keys[i];
                            if(key === productElement.product_id){
                                productElement.shoppingCartAmount = availableShoppingCartItems[key];
                            }
                        }
                    });
                });
            }
            setCurrentPharmacy(tempPharmacy);
        }
    }

    const selectedProduct = (selectProduct: ProductType)=> {
        let tempPharmacy = _.cloneDeep(currentPharmacy);
        let totalPrice = 0
        tempPharmacy.forEach((element: PharmacyType)=> {
            element.products.forEach((productElement) => {
                if(productElement.product_id === selectProduct.product_id && productElement.isSelected){
                    {/*// @ts-ignore */}
                    totalPrice = calculateSumOfProducts(0, (parseFloat(productElement.price)*productElement.shoppingCartAmount).toString(), sumOfProductPrice);
                    productElement.isSelected = false;
                }
                else if(productElement.product_id === selectProduct.product_id && !productElement.isSelected){
                    {/*// @ts-ignore */}
                    totalPrice = calculateSumOfProducts(1, (parseFloat(productElement.price)*productElement.shoppingCartAmount).toString(), sumOfProductPrice);
                    productElement.isSelected = true;
                }
            });
        });
        tempPharmacy.forEach((element: PharmacyType)=> {
            const isSelectedProduct = element.products.filter((productElement: ProductType)=>productElement.isSelected);
            const originProductLength = element.products.length;
            if(originProductLength === isSelectedProduct.length){
                element.isSelected = true;
            }
            else{
                element.isSelected = false;
            }
        });
        setCurrentPharmacy(tempPharmacy);
        setSumOfProductPrice(totalPrice);
    };

    const selectedPharmacy = (selectPharmacy: PharmacyType) => {
        let tempPharmacy = _.cloneDeep(currentPharmacy);
        let totalPrice = 0;
        tempPharmacy.forEach((element: PharmacyType) => {
            if(element.pharmacy_id === selectPharmacy.pharmacy_id && element.isSelected){
                let tempPrice = 0;
                element.isSelected = false;
                element.products.forEach((productElement: ProductType) => {
                    {/*// @ts-ignore */}
                    tempPrice += parseFloat(productElement.price)*productElement.shoppingCartAmount;
                    productElement.isSelected = false;
                });
                totalPrice = calculateSumOfProducts(0, tempPrice.toString(), sumOfProductPrice);
            }
            else if(element.pharmacy_id === selectPharmacy.pharmacy_id && !element.isSelected){
                let tempPrice = 0;
                element.isSelected = true;
                element.products.forEach((productElement: ProductType) => {
                    {/*// @ts-ignore */}
                    tempPrice += parseFloat(productElement.price)*productElement.shoppingCartAmount;
                    productElement.isSelected = true;
                });
                totalPrice = calculateSumOfProducts(1, tempPrice.toString(), sumOfProductPrice);
            }
        });
        setCurrentPharmacy(tempPharmacy);
        setSumOfProductPrice(totalPrice);
    };

    const calculateSumOfProducts = (type: number, price: string, currentPrice: number) => {
        let temp = 0;
        if(type === 0){
            temp = currentPrice - parseFloat(price); 
        }
        else{
            temp = currentPrice + parseFloat(price); 
        }
        return temp;
    };

    const addToShoppingCartFunction = async (productId: string)=> {
        setIsLoading(true);
        dispatch(addToShoppingCart({customerUserId: availableLoginUser.CustomerUser.customer_user_id, productId: productId, type: 1}, availableLoginUser.Token)).then(() => {
            Alert.alert(
                i18n.t('success'),
                i18n.t('shoppingCart.addOneSuccess'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
    
            setIsLoading(false);
        });
    }

    const removeFromShoppingCartFunction = async (productId: string)=> {
        setIsLoading(true);
        dispatch(addToShoppingCart({customerUserId: availableLoginUser.CustomerUser.customer_user_id, productId: productId, type: 0}, availableLoginUser.Token)).then(() => {
            Alert.alert(
                i18n.t('success'),
                i18n.t('shoppingCart.addOneSuccess'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
    
            setIsLoading(false);
        });
    }
    
    const goToNextPage = () => {
        let tempPharmacy = _.cloneDeep(currentPharmacy);
        const tempResult:any = [];
        tempPharmacy.forEach((element: PharmacyType) =>{
            const selectedProduct = element.products.filter((productElement) => productElement.isSelected);
            const filterProductsPharmacy:any = _.omit(element, ['products']);
            filterProductsPharmacy.products = selectedProduct;
            if(selectedProduct.length){
                tempResult.push(filterProductsPharmacy);
            }
        });

        navigation.navigate('ConfirmOrder', {orderItems:tempResult, sumOfTotal: sumOfProductPrice });
    };

    const selectedAllProduct = () => {
        let tempPharmacy = _.cloneDeep(currentPharmacy);
        let totalPrice = 0;
        if(checked){
            let tempPrice = 0;
            tempPharmacy.forEach((element: PharmacyType) => {
                element.products.forEach((productElement: ProductType) => {
                    {/*// @ts-ignore */}
                    tempPrice += parseFloat(productElement.price)*productElement.shoppingCartAmount;
                    productElement.isSelected = false;
                });
                element.isSelected = false;
            });
            totalPrice = calculateSumOfProducts(0, tempPrice.toString(), sumOfProductPrice);
            setChecked(false);
        }
        else{
            let tempPrice = 0;
            tempPharmacy.forEach((element: PharmacyType) => {
                element.products.forEach((productElement: ProductType) => {
                    {/*// @ts-ignore */}
                    tempPrice += parseFloat(productElement.price)*productElement.shoppingCartAmount;
                    productElement.isSelected = true;
                });
                element.isSelected = true;
            });
            totalPrice = calculateSumOfProducts(1, tempPrice.toString(), 0);
            setChecked(true);
        }
        setCurrentPharmacy(tempPharmacy);
        setSumOfProductPrice(totalPrice);
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
                currentPharmacy.length?
                currentPharmacy.map((element: PharmacyType, index: number) => (
                    <View key={index} style={styles.pharmacyContainer}>
                        <View style={styles.pharmacyTitleContainer}>
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    status={element.isSelected ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        selectedPharmacy(element);
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={styles.pharmacyOverallContainer}  onPress={()=>navigation.navigate('Pharmacy', { pharmacyId: element.pharmacy_id})}>
                                <Image style={styles.pharmayIcon} resizeMode="contain" source={require('../../assets/pharmacy/pharmacy.png')}></Image>
                                <Text>{i18n.language === 'en' ? element.name_en:element.name_cn}</Text>
                                <Image style={styles.pharmayIcon} resizeMode="contain" source={require('../../assets/right.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        {
                            element.products.map((productElement, productIndex)=>(
                                <View key={productIndex} style={styles.productContainer}>
                                    <View style={styles.checkboxContainer}>
                                        <Checkbox
                                            status={productElement.isSelected ? 'checked' : 'unchecked'}
                                            onPress={() => {
                                                selectedProduct(productElement);
                                            }}
                                        />
                                    </View>
                                    <TouchableOpacity style={styles.productOverallContainer} onPress={()=>navigation.navigate('MedicineProductDetail', { productId: productElement.product_id})}>
                                        <Image style={styles.image} resizeMode="contain" source={{uri: productElement.image}}></Image>
                                        <View style={styles.descriptionContainer}>
                                            <Text style={styles.titleText}>{i18n.language === 'en' ? productElement.title_en:productElement.title_cn}</Text>
                                            <Text style={styles.redText}>${productElement.price}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.shoppingCartAddMinusAmountContainer}>
                                        <TouchableOpacity onPress={()=>removeFromShoppingCartFunction(productElement.product_id)}>
                                            <Image style={styles.shoppingCartIcon} resizeMode="contain" source={require('../../assets/minus.png')}></Image>
                                        </TouchableOpacity>
                                        <View style={styles.shoppingCartAmountContainer}>
                                            <Text>{productElement.shoppingCartAmount}</Text>
                                        </View>
                                        <TouchableOpacity onPress={()=>addToShoppingCartFunction(productElement.product_id)}>
                                            <Image style={styles.shoppingCartIcon} resizeMode="contain" source={require('../../assets/add.png')}></Image>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                ))
                : 
                <View>
                    <Text style={styles.emptyText}>{i18n.t('medicineProductDetail.shoppingCartEmpty')}</Text>
                </View>
            }
            <View style={styles.totalContainer}>
                <View style={styles.checkboxContainer}>
                    {/* <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={selectedAllProduct}
                    /> */}
                </View>
                <View style={styles.totalTextContainer}>
                    <Text style={styles.totalText}>{i18n.t('shoppingCart.total')}: </Text>
                    <Text style={styles.sumOfTotalText}>{sumOfProductPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.totalButtonContainer}>
                    <Button color={"#000000"} title={i18n.t('shoppingCart.pay')} onPress={goToNextPage}/>
                </View>
            </View> 
        </ScrollView>
    );
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
    spinnerTextStyle: {
        color: '#FFF'
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
    checkboxContainer: {
        borderWidth: 1,
        borderColor: '#fafafa',
        backgroundColor: '#fafafa',
        borderRadius: 50,
        marginRight: 10,
    },
    shoppingCartAmountContainer: {
        backgroundColor: '#fcfcfc',
        padding: 5,
        borderRadius: 10,
        alignSelf: 'flex-start'
    },
    shoppingCartIcon: {
        resizeMode: 'contain',
        height: 30,
        width: 30,
        marginHorizontal: 3,
    },
    shoppingCartAddMinusAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10
    },
    emptyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    productOverallContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    pharmacyOverallContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    totalTextContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sumOfTotalText: {
        fontWeight: 'bold',
        fontSize: 23,
        color: '#ff0000'
    },
    totalText: {
        fontSize: 16,
    },
    totalButtonContainer: {
        backgroundColor: '#00d2c3',
        paddingHorizontal: 5,
        borderRadius: 10,
        marginLeft: 20,
    },
    totalContainer: {
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
export default ShoppingCart;