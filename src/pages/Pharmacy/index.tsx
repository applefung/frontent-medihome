import React, { useEffect, useState, useRef } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, Alert, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { PharmacyType } from '../../types/models/Pharmacy';
import ProductCard from '../../components/ProductCard';
import PharmacyHome from '../../components/PharmacyHome';
import PharmacyAll from '../../components/PharmacyAll';
import PharmacyInformation from '../../components/PharmacyInformation';
import Comment from '../../components/Comment';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import Spinner from 'react-native-loading-spinner-overlay';
import { toggleBookmark } from '../../actions/customerUser';
import _ from 'lodash';
import { getRoom } from '../../actions/chat';

const Pharmacy = ({route}: any) => {
    const usePrevious = (value: any) => {
      const ref = useRef();
      useEffect(() => {
        ref.current = value;
      });
      return ref.current;
  }

    const pharmacyId =  route.params.pharmacyId;
    const { i18n, t } = useTranslation();
    const navigation = useNavigation();
    const availablePharmacy:any = useSelector<RootState>(state => state.Pharmacy.Pharmacy);
    const availableLoginUser:any = useSelector<RootState>(state=>state.Authentication.LoginUser);
    const [isBookmark, setIsBookmark] = useState(false);
    const [isLoading, setIsLoding] = useState(false);
    const prevLoginUser = usePrevious(availableLoginUser);
    const dispatch = useDispatch();
    const foundPharmacy = availablePharmacy.find((element:PharmacyType)=>element.pharmacy_id === parseInt(pharmacyId));
    const availableChat:any = useSelector<RootState>(state=>state.Chat.Chat);

    useEffect(()=>{
      init();
    }, []);

    const init = () => {
      if(availableLoginUser.Token.length){
        const bookmark = availableLoginUser.CustomerUser.bookmark;
          if(bookmark !== null){
            if(bookmark.includes(pharmacyId)){
              setIsBookmark(true);
            }
          }
      }
    }

    useEffect(() => {
      if(!_.isEqual(prevLoginUser, availableLoginUser)){
          init();
      }
  }, [availablePharmacy, availableLoginUser]);

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fafafa', marginTop: 15 }} >
            <PharmacyHome pharmacy={foundPharmacy}/>
        </View>
      );
      
      const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
            <PharmacyAll pharmacy={foundPharmacy}/>
        </View>
      );
      
      const ThirdRoute = () => (
          <View style={{ flex: 1, backgroundColor: '#fafafa' }} >
            <Comment pharmacyId={pharmacyId}/>
          </View>
      );
      
      const FourthRoute = () => (
          <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
              <PharmacyInformation pharmacy={foundPharmacy}/>
          </View>
      );

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: i18n.t('pharmacy.home') },
    { key: 'all', title: i18n.t('pharmacy.all') },
    { key: 'comment', title: i18n.t('pharmacy.comment') },
    { key: 'information', title: i18n.t('pharmacy.information') },
  ]);

  const renderScene = SceneMap({
    home: FirstRoute,
    all: SecondRoute,
    comment: ThirdRoute,
    information: FourthRoute,
  });

  const goToChat = () => {
    //check jwt
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
    //check room number
    dispatch(getRoom(availableLoginUser.CustomerUser.customer_user_id, pharmacyId, availableLoginUser.Token)).then(()=>{
      navigation.navigate('Chat', { pharmacyId: pharmacyId, roomId: availableChat.room_id });
  });


  }

  const goToAddComment = () => {
    //check jwt
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
    //check room number

    navigation.navigate('AddComment', { pharmacyId: pharmacyId });
  }
  
  const toggleBookmarkFunction = async () => {
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
      return;
  }

    if(isBookmark){
      setIsBookmark(false);
      setIsLoding(true);
      dispatch(toggleBookmark({customerUserId: availableLoginUser.CustomerUser.customer_user_id, pharmacyId: pharmacyId, type: 0}, availableLoginUser.Token)).then(() => {
        setIsLoding(false);
        Alert.alert(
          i18n.t('success'),
          i18n.t('pharmacy.removeBookmarkSuccess'),
          [
            {
              text: i18n.t('ok'),
              onPress: () => navigation.navigate("HomePage"),
              style: "cancel",
            },
          ],
        );
      })
    }
    else{
      setIsBookmark(true);
      setIsLoding(true);
      dispatch(toggleBookmark({customerUserId: availableLoginUser.CustomerUser.customer_user_id, pharmacyId: pharmacyId, type: 1}, availableLoginUser.Token)).then(() => {
        setIsLoding(false);
        Alert.alert(
          i18n.t('success'),
          i18n.t('pharmacy.addBookmarkSuccess'),
          [
            {
              text: i18n.t('ok'),
              onPress: () => navigation.navigate("HomePage"),
              style: "cancel",
            },
          ],
        );
      })
    }

  };

  return (
    <View style={styles.screen}>
        {
            isLoading?
            <Spinner
                visible={isLoading}
                textContent={i18n.t('loading')}
                textStyle={styles.spinnerTextStyle}
            />:null
        }
        <ProductCard product={foundPharmacy}/>
        <TouchableOpacity style={styles.contactUsContainer} onPress={goToChat}>
            <Text style={styles.contactUsText}>{i18n.t('pharmacy.contactUs')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addCommentContainer} onPress={goToAddComment}>
            <Text style={styles.addCommentText}>{i18n.t('pharmacy.addComment')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bookmarkContainer} onPress={toggleBookmarkFunction}>
            <Text style={styles.bookmarkText}>{isBookmark?i18n.t('pharmacy.removeBookmark'):i18n.t('pharmacy.bookmark')}</Text>
        </TouchableOpacity>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor:'#ffffff'
    },
    contactUsContainer: {
        backgroundColor: '#00d2c3',
        paddingHorizontal: 10,
        paddingVertical: 10,
        margin: 10,
    },
    contactUsText: {
        color: '#ffffff',
        textAlign: 'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    addCommentContainer: {
      backgroundColor: '#5cb85c',
      paddingHorizontal: 10,
      paddingVertical: 10,
      margin: 10,
    },
    addCommentText: {
        color: '#ffffff',
        textAlign: 'center'
    },
    bookmarkContainer: {
      backgroundColor: '#0275d8',
      paddingHorizontal: 10,
      paddingVertical: 10,
      margin: 10,
    },
    bookmarkText: {
        color: '#ffffff',
        textAlign: 'center'
    },
});

export default Pharmacy;