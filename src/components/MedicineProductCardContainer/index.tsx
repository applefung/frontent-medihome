import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';
import MedicineProductCard from '../MedicineProductCard';
import { ProductType } from '../../types/models/Product';

type MedicineProductCardContainerProps = {
    items: ProductType[];
};


const MedicineProductCardContainer = ({items}: MedicineProductCardContainerProps)=> {
    return (
        <ScrollView>
            {
                items.map((element:ProductType, index:number) => {
                    return (
                       <View key={index}>
                            <MedicineProductCard product={element}/>
                       </View>
                    );
                })
            }
        </ScrollView>
    );
};

export default MedicineProductCardContainer;