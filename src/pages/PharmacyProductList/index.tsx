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

const PharmacyProductList = ({route}: any) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(false);
    const { i18n, t } = useTranslation("en");
    const dispatch = useDispatch();
    const pharmacy:any = useSelector<RootState>(state=>state.Pharmacy.Pharmacy);
    const {category, pharmacyId} = route.params;
    const filteredPharmacy = pharmacy.filter((element: any, index: number) => element.pharmacy_id === pharmacyId );

    const categorizedProducts = filteredPharmacy[0].products.filter((element: any, index: number) => element.category.category_en.includes(category)||element.category.category_cn.includes(category));

    return (
        <ScrollView>
            <MedicineProductCardContainer items={categorizedProducts}/>
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


export default PharmacyProductList;