import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';

type ImageSourcePropType = React.ComponentProps<typeof Image>['source'];

type categoryProps = {
    path: string,
    title: string
}
const Category = ({path, title}: categoryProps) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={()=>{navigation.navigate("ProductList", { category: title })}}>
            {/*// @ts-ignore */}
            <Image style={styles.image} resizeMode="contain" source={path}></Image>
            <Text>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '20%',
    },
    image: {
        resizeMode: 'contain',
        height: 50,
        marginBottom: 5,
    },
});


export default Category;