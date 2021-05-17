import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ProductCard from '../ProductCard';
import { PharmacyType } from '../../types/models/Pharmacy';

type ProductCardContainerProps = {
    items: PharmacyType[];
};


const ProductCardContainer = ({items}: ProductCardContainerProps)=> {

    return (
        <View>
            {
                items.map((element:PharmacyType, index:number) => {
                    return (
                       <View key={index}>
                            <ProductCard product={element}/>
                       </View>
                    );
                })
            }
        </View>
    );
};

export default ProductCardContainer;