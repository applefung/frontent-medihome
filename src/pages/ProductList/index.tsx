import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/product';
import type { RootState } from '../../store/store';
import MedicineProductCardContainer from '../../components/MedicineProductCardContainer';
import MyCarousel from '../../components/MyCarousel';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native';

const ProductList = ({route}: any) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const { i18n, t } = useTranslation("en");
    const dispatch = useDispatch();
    const products:any = useSelector<RootState>(state=>state.Products.Products);
    const availableCarousel:any = useSelector<RootState>(state => state.Carousel.Carousel);
    const category = route.params.category;

    useEffect(()=>{
        init();
    }, [isFocused])

    const init = async () => {
        setIsLoading(true);
        await dispatch(getProduct("categoryName="+category+"&lang="+i18n.language));
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
            <View style={styles.carouselContainer}>
                <MyCarousel carouselItems={availableCarousel}/>
            </View>
            {
                products.length ?  <MedicineProductCardContainer items={products}/>: <Text style={styles.noResultText}>{i18n.t('noResult')}</Text>
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        height: 100,
    },
    noResultText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    spinnerTextStyle: {
        color: '#FFF'
    }
  });


export default ProductList;