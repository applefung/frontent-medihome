
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import PharmacyCategoryContainer from '../PharmacyCategoryContainer';
import MedicineSquareCard from '../MedicineSquareCard';
import { ProductType } from '../../types/models/Product';

const PharmacyHome = ({pharmacy}: any) =>{
    return (
        <ScrollView>
            <PharmacyCategoryContainer pharmacyId={pharmacy.pharmacy_id}/>
            <View style={styles.container}>
                {
                    pharmacy.products.map((element: ProductType, index: number)=><MedicineSquareCard product={element} />)
                }
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap:'wrap',
    },
});

export default PharmacyHome;