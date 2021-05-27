import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet, Text, Image, TouchableOpacity, Button, ScrollView, Alert, Platform, TouchableOpacityComponent } from "react-native";
import PharmacyMedicineCard from '../../components/PharmacyMedicineCard';
import { PharmacyType } from '../../types/models/Pharmacy';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import PharmacyInformation from '../../components/PharmacyInformation';
import { createOrderService } from '../../services/order';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/core';

const ConfirmOrder = ({route}:any)=> {
    const { sumOfTotal, orderItems } = route.params;
    const navigation = useNavigation();
    const { i18n, t } = useTranslation();
    const [contactText, setContactText] = useState('');
    const [addressText, setAddressText] = useState('');
    const [remarkText, setRemarkText] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [deliveryMode, setDeliveryMode] = useState('delivery');
    const [isLoading, setIsLoading] = useState(false);
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const onDateChange = (event:any, selectedDate:any) => {
      const currentDate = selectedDate || date;
      setDate(currentDate);
    };
    
    const onTimeChange = (event:any, selectedTime:any) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
    };

    const submitOrder = async () => {
        const pharmacyIdsArray:any = [];
        orderItems.forEach((element: PharmacyType) => {
            pharmacyIdsArray.push(element.pharmacy_id);
        });

        const productIdsJson:any = {};
        orderItems.forEach((element: PharmacyType) => {
            element.products.forEach((productElement) => {
                {/*// @ts-ignore */}
                productIdsJson[productElement.product_id] = productElement.shoppingCartAmount
            })
        });
        const productIds = JSON.stringify(productIdsJson);
        // const deliverDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        // const deliverTime = time.getHours()+"-"+time.getMinutes()+"-"+time.getSeconds();
        const customerUserId = availableLoginUser.CustomerUser.customer_user_id;
        const token = availableLoginUser.Token;
        const totalPrice = sumOfTotal.toFixed(2).toString();
  
        const data = {
            customerUserId: parseInt(customerUserId),
            pharmacyIds: pharmacyIdsArray.toString(),
            productIds: productIds,
            address: addressText,
            contact: contactText,
            remark: remarkText,
            deliveryDate: date+" "+time,
            sumOfTotal: totalPrice.toString(),
        };

        setIsLoading(true);
        const resp = await createOrderService(data, token).catch((error: Error) => {
            Alert.alert(
                i18n.t('error'),
                i18n.t('systemError'),
                [
                  {
                    text: i18n.t('ok'),
                    style: "cancel",
                  },
                ],
              );
        });
        
        Alert.alert(
            i18n.t('success'),
            i18n.t('confirmOrder.createOrderSuccess'),
            [
              {
                text: i18n.t('ok'),
                onPress: () => navigation.navigate("HomePage"),
                style: "cancel",
              },
            ],
          );
        
          navigation.navigate("HomePage"),
        setIsLoading(false);
    }

    const changeDeliveryMode = () => {
        if(deliveryMode === 'delivery'){
            setDeliveryMode('pickup');
        }
        else{
            setDeliveryMode('delivery');
        }
    }

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
            <View>
                <View style={styles.deliveryMethodContainer}>
                    <TouchableOpacity style={styles.deliveryTextContainer} onPress={changeDeliveryMode}>
                        <Text style={[styles.deliveryText, deliveryMode==='delivery'?{color: '#00d2c3'}:null]}>{i18n.t('confirmOrder.delivery')}</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.pickUpTextContainer} onPress={changeDeliveryMode}>
                        <Text style={[styles.pickUpText, deliveryMode==='pickup'?{color: '#00d2c3'}:null]}>{i18n.t('confirmOrder.pickup')}</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.addressContainer}>
                    <TextInput
                        label={'Address 住址'}
                        value={addressText}
                        onChangeText={text => setAddressText(text)}
                        theme={{
                            colors: {
                                        placeholder: '#00d2c3', text: '#00d2c3', primary: '#00d2c3',
                                        background: '#ffffff'
                                }
                            }}
                    />
                </View>
                <View style={styles.contactContainer}>
                    <TextInput
                        label={'Contact 聯絡方式'}
                        value={contactText}
                        onChangeText={text => setContactText(text)}
                        theme={{
                            colors: {
                                        placeholder: '#00d2c3', text: '#00d2c3', primary: '#00d2c3',
                                        background: '#ffffff'
                                }
                            }}
                    />
                </View>
                <View style={styles.remarkContainer}>
                    <TextInput
                        label={'Remark 備註'}
                        value={remarkText}
                        onChangeText={text => setRemarkText(text)}
                        theme={{
                            colors: {
                                        placeholder: '#00d2c3', text: '#00d2c3', primary: '#00d2c3',
                                        background: '#ffffff'
                                }
                            }}
                    />  
                </View>
                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTimeSingleContainer}>
                        <Text style={styles.deliveryTimeText}>{i18n.t('confirmOrder.deliveryDate')}</Text>
                        <TextInput
                            label={'Date 日期'}
                            value={date}
                            onChangeText={text => setDate(text)}
                            theme={{
                                colors: {
                                            placeholder: '#00d2c3', text: '#00d2c3', primary: '#00d2c3',
                                            background: '#ffffff'
                                    }
                                }}
                        />  
                        {/* <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={true}
                            display="default"
                            onChange={onDateChange}
                        /> */}
                    </View>
                    <View style={styles.dateTimeSingleContainer}>
                        <Text style={styles.deliveryTimeText}>{i18n.t('confirmOrder.deliveryTime')}</Text>
                        <TextInput
                            label={'Time 時間'}
                            value={time}
                            onChangeText={text => setTime(text)}
                            theme={{
                                colors: {
                                            placeholder: '#00d2c3', text: '#00d2c3', primary: '#00d2c3',
                                            background: '#ffffff'
                                    }
                                }}
                        />  
                        {/* <DateTimePicker
                            testID="dateTimePicker"
                            value={time}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={onTimeChange}
                        /> */}
                    </View>
                </View>
                <View style={styles.paymentMethodContainer}>
                    <Text style={styles.paymentMethodText}>{i18n.t('confirmOrder.paymentMethod')}:</Text>
                    <Text style={styles.cashText}>{i18n.t('confirmOrder.cash')}</Text>
                </View>
            </View>
            {
                orderItems.length?
                orderItems.map((element: PharmacyType, index: number)=> (
                    <View key={index}>
                        <PharmacyMedicineCard pharmacy={element} />
                    </View>
                ))
                : null
            }
            <View style={styles.totalContainer}>
                <View style={styles.totalTextContainer}>
                        <Text style={styles.totalText}>{i18n.t('shoppingCart.total')}: </Text>
                        <Text style={styles.sumOfTotalText}>{sumOfTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.totalButtonContainer}>
                    <Button color={"#000000"} title={i18n.t('shoppingCart.pay')} onPress={submitOrder}/>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    totalTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
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
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
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
    deliveryMethodContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
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
    deliveryText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    pickUpText: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    deliveryTextContainer: {
        flex: 1
    },
    pickUpTextContainer: {
        flex: 1
    },
    addressContainer: {
        margin: 10,
    },
    contactContainer: {
        margin: 10,
    },
    remarkContainer: {
        margin: 10,
    },
    dateTimeContainer: {
        margin: 10,
    },
    paymentMethodText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00d2c3',
        padding: 5,
    },
    cashText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00d2c3',
        marginLeft: 10,
    },
    deliveryTimeText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#00d2c3',
        marginVertical: 10,
    },
    dateTimeSingleContainer: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        marginVertical: 10,
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
    spinnerTextStyle: {
        color: '#FFF'
    }
});
export default ConfirmOrder;