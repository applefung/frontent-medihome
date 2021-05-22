import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import { RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/core';
import { Rating } from 'react-native-ratings';
import { postPharmacyComment } from '../../actions/pharmacyComment';

const  AddComment = ({route}: any)=> {
    const { i18n, t } = useTranslation("en");
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const [rating, setRating] = useState(0);
    const pharmacyId =  route.params.pharmacyId;

    const ratingCompleted = (ratingValue: number) => {
        setRating(ratingValue);
    }

    const handleSubmit = async () => {
        setIsLoading(true);
        dispatch(postPharmacyComment({pharmacyId: pharmacyId, content: text, rating: rating, customerUserId: availableLoginUser.CustomerUser.customer_user_id}, availableLoginUser.Token)).then(() => {
            setIsLoading(false);
            Alert.alert(
                i18n.t('success'),
                i18n.t('addComment.addCommentSuccess'),
                [
                  {
                    text: i18n.t('ok'),
                    onPress: ()=>navigation.navigate("Pharmacy", {pharmacyId: pharmacyId}),
                    style: "cancel",
                  },
                ],
              );
        });
        navigation.navigate("Pharmacy", {pharmacyId: pharmacyId});
    }

    return (
        <View>
             {
                isLoading?
                <Spinner
                    visible={isLoading}
                    textContent={i18n.t('loading')}
                    textStyle={styles.spinnerTextStyle}
                />:null
            }
            <Text style={styles.title}>
                {i18n.t('addComment.comment')}
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={value => setText(value)}
                value={text}
            />
            <Rating
                showRating
                ratingColor='#ffff33'
                ratingBackgroundColor='#ffffff'
                ratingTextColor='#000000'
                type='custom'
                startingValue={0}
                onFinishRating={ratingCompleted}
                style={styles.rating}
            />
            <View style={styles.button}>
                <Button
                    onPress={()=> {handleSubmit()}}
                    title={i18n.t('submit')}
                    color="#0275d8"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
    button: {
        margin: 20,
        alignItems: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '900',
        margin: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    rating: {
        paddingVertical: 10 
    }
  });

export default AddComment;