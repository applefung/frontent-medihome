import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, useWindowDimensions } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/product';
import type { RootState } from '../../store/store';
import MedicineProductCardContainer from '../../components/MedicineProductCardContainer';
import ProductCardContainer from '../../components/ProductCardContainer';
import MyCarousel from '../../components/MyCarousel';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-native-loading-spinner-overlay';
import { useIsFocused } from '@react-navigation/native';
import { TabView, SceneMap } from 'react-native-tab-view';

const ResultList = ({route}: any) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const { i18n, t } = useTranslation("en");
    const dispatch = useDispatch();
    const availableCarousel:any = useSelector<RootState>(state => state.Carousel.Carousel);
    const product = route.params.product;

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fafafa', marginTop: 15 }} >
            {
                product.product.length ? <MedicineProductCardContainer items={product.product}/>:<Text style={styles.noResultText}>{i18n.t('noResult')}</Text>
            }
        </View>
      );
      
      const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
           {
               product.pharmacy.length ?  <ProductCardContainer items={product.pharmacy}/>:<Text style={styles.noResultText}>{i18n.t('noResult')}</Text>
           }
        </View>
      );
    
      const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'product', title: 'Product' },
    { key: 'pharmacy', title: 'Pharmacy' },
  ]);

  const renderScene = SceneMap({
    product: FirstRoute,
    pharmacy: SecondRoute,
  });

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
            <View style={styles.carouselContainer}>
                <MyCarousel carouselItems={availableCarousel}/>
            </View>
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
        flex: 1
    },
    carouselContainer: {
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        height: 100,
    },
    noResultText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 10,
    },
    spinnerTextStyle: {
        color: '#FFF'
    }
  });


export default ResultList;