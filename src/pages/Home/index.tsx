import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,  Platform, NativeModules, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-paper';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getCarousel } from '../../actions/carousel';
import type { RootState } from '../../store/store';
import type { AppDispatch } from '../../store/store';
import CategoryContainer from '../../components/CategoryContainer';
import SloganContainer from '../../components/SloganContainer';
import MyCarousel from '../../components/MyCarousel';
import ProductCardContainer from '../../components/ProductCardContainer';
import { ScrollView } from 'react-native-gesture-handler';
import { getPharmacy } from '../../actions/pharmacy';
import { PharmacyType } from '../../types/models/Pharmacy'; 
import i18n from '../../i18n/index';
import Spinner from 'react-native-loading-spinner-overlay';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : StatusBarManager.HEIGHT;

const HomePage = () => {
    // const { i18n, t } = useTranslation("en");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const availableCarousel:any = useSelector<RootState>(state => state.Carousel.Carousel);
    const availablePharmacy:any = useSelector<RootState>(state => state.Pharmacy.Pharmacy);
    const hotPharmacy = availablePharmacy.filter((element:PharmacyType, index: number)=>element.tag.includes('hot'));
    const [text, setText] = useState('');

    useEffect(()=>{
        init();
    }, []);

    const init = async () => {
        setIsLoading(true);
        await dispatch(getCarousel());
        await dispatch(getPharmacy("all"));
        setIsLoading(false);
    };

    return (
        <ScrollView style={styles.screen}>
            {
                isLoading?
                <Spinner
                    visible={isLoading}
                    textContent={i18n.t('loading')}
                    textStyle={styles.spinnerTextStyle}
                />:null
            }
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <TextInput
                        label={'Product Name 產品名稱'}
                        value={text}
                        onChangeText={text => setText(text)}
                    />
                </View>
                <View style={styles.changeLang}>
                    <TouchableOpacity onPress={() => i18n.changeLanguage('cn')}>
                        <Text>中</Text>
                    </TouchableOpacity>
                    <Text>/</Text>
                    <TouchableOpacity onPress={() => i18n.changeLanguage('en')}>
                        <Text>Eng</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <CategoryContainer />
            <SloganContainer />
            <View style={styles.carouselContainer}>
                <MyCarousel carouselItems={availableCarousel}/>
            </View>
            <View style={styles.recommendationContainer}>
                <Text>{i18n.t('home.recommendation')}</Text>
            </View>
            <ProductCardContainer items={hotPharmacy}/>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#fafafa'
    },
    header: {
        flexDirection: 'row',
        marginVertical: STATUSBAR_HEIGHT,
        alignItems: 'center'
    },
    searchBar: {
        marginHorizontal: 10,
        flex: 9
    },
    changeLang: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 10,
    },
    carouselContainer: {
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        height: 100,
    },
    recommendationContainer: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
    },
    spinnerTextStyle: {
        color: '#FFF'
    }
  });


export default HomePage;