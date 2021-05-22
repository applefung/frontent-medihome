import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions/order';
import { RootState } from '../../store/store';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused, useNavigation } from '@react-navigation/core';
import { OrderType } from '../../types/models/Order';
import _ from 'lodash';
import { PharmacyType } from '../../types/models/Pharmacy';
import MedicineCategoryTouchableCard from '../../components/MedicineCategoryTouchableCard'

const MyOrder = () => {
    const usePrevious = (value: any) => {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    }
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const availableOrder:any = useSelector<RootState>(state=>state.Order.Order);
    const [isLoading, setIsLoading] = useState(false);
    const prevOrder = usePrevious(availableOrder);

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
            init();
        }
    }, [isFocused]);

    const init = async()=> {
        setIsLoading(true);
        dispatch(getOrder(availableLoginUser.CustomerUser.customer_user_id, availableLoginUser.Token)).then(()=> {
            setIsLoading(false);
        });
    };

    useEffect(() => {
        if(!_.isEqual(prevOrder, availableOrder)){
            init();
        }
    }, [availableOrder]);

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
                availableOrder.length?
                availableOrder.map((element: OrderType, index: number) => (
                    <View key={index} style={styles.orderContainer}>
                        <Text style={styles.orderText}>{i18n.t('order.order')} #{index}</Text>
                        <View style={styles.textContainer}>
                            <Text style={styles.keyText}>{i18n.t('order.orderDate')}</Text>
                            <Text style={styles.valueText}>{element.order_date}</Text>
                        </View>
                        {
                            element.pharmacy.map((pharmacyElement: PharmacyType, pharmacyIndex: number) => (
                                <View key={pharmacyIndex} style={styles.pharmacyContainer}>
                                    <MedicineCategoryTouchableCard pharmacy={pharmacyElement}/>
                                </View>
                            ))
                        }
                        <View style={styles.textContainer}>
                            <Text style={styles.keyText}>{i18n.t('order.address')}</Text>
                            <Text style={styles.valueText}>{element.address}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.keyText}>{i18n.t('order.contact')}</Text>
                            <Text style={styles.valueText}>{element.contact}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.keyText}>{i18n.t('order.remark')}</Text>
                            <Text style={styles.valueText}>{element.remark}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.keyText}>{i18n.t('order.deliveryDate')}</Text>
                            <Text style={styles.valueText}>{element.delivery_date}</Text>
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.keyText}>{i18n.t('order.sumOfTotal')}</Text>
                            <Text style={styles.valueText}>{element.sum_of_total}</Text>
                        </View>
                    </View>
                ))
                : 
                <View>
                    <Text style={styles.noOrderText}>{i18n.t('order.noOrder')}</Text>
                </View>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    noOrderText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    orderContainer: {
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
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    keyText: {
        fontWeight: 'bold',
        fontSize: 16,
        flex: 1
    },
    valueText: {
        fontSize: 14,
    },
    orderText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    pharmacyContainer: {
        marginVertical: 10,
    }
});
export default MyOrder;