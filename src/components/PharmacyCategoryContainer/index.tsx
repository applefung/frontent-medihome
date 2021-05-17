import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from "react-native";
import PharmacyCategory from '../../components/PharmacyCategory';

type PharmacyCategoryContainerProps = {
    pharmacyId: string;
};

const PharmacyCategoryContainer = ({pharmacyId}: PharmacyCategoryContainerProps) => {
    const { i18n, t } = useTranslation("en");

    const catgoryIcons = [
        [
            {
                titleEn: 'Cold',
                titleCn: '感冒',
                src: require('../../assets/category/cold.png'),
              },
              {
                  titleEn: 'Pediatrics',
                  titleCn: '兒科',
                  src: require('../../assets/category/pediatrics.png'),
              },
              {
                  titleEn: 'Throat',
                  titleCn: '咽喉',
                  src: require('../../assets/category/throat.png'),
              },
              {
                  titleEn: 'Gastrointestinal',
                  titleCn: '腸胃消化',
                  src: require('../../assets/category/gastrointestinal.png'),
              },
              {
                  titleEn: 'Topical',
                  titleCn: '男性用藥',
                  src: require('../../assets/category/topical.png'),
              },
        ],
        [
            {
                titleEn: 'Topical',
                titleCn: '男性用藥',
                src: require('../../assets/category/topical.png'),
            },
            {
                titleEn: 'Topical',
                titleCn: '男性用藥',
                src: require('../../assets/category/topical.png'),
            },
            {
                titleEn: 'Topical',
                titleCn: '男性用藥',
                src: require('../../assets/category/topical.png'),
            },
            {
                titleEn: 'Topical',
                titleCn: '男性用藥',
                src: require('../../assets/category/topical.png'),
            },
            {
                titleEn: 'Topical',
                titleCn: '男性用藥',
                src: require('../../assets/category/topical.png'),
            },
        ]
    ];


    return (
        <View style={styles.container}>
            {
                catgoryIcons.map((item, key)=> <View style={styles.row} key={key}>{item.map((item1, key1) => <PharmacyCategory pharmacyId={pharmacyId} key={key1} path={item1.src} title={i18n.language==='en'?item1.titleEn:item1.titleCn}></PharmacyCategory>)}</View>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000000',
        padding: 10,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: 'row',
    }
});


export default PharmacyCategoryContainer;