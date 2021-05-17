
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from "react-native";
import MedicineSquareCard from '../MedicineSquareCard';
import { ProductType } from '../../types/models/Product';

const PharmacyAll = ({pharmacy}: any) =>{
    return (
        <ScrollView>
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

export default PharmacyAll;