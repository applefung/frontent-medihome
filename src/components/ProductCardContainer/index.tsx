import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import ProductCard from '../ProductCard';
import { PharmacyType } from '../../types/models/Pharmacy';

type ProductCardContainerProps = {
    items: PharmacyType[];
};


const ProductCardContainer = ({items}: ProductCardContainerProps)=> {

    return (
        <ScrollView>
            {
                items.map((element:PharmacyType, index:number) => {
                    return (
                       <View key={index}>
                            <ProductCard product={element}/>
                       </View>
                    );
                })
            }
        </ScrollView>
    );
};

export default ProductCardContainer;