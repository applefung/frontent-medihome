import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, StyleSheet } from "react-native";
import Category from '../../components/Category';

const CategoryContainer = () => {
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
                  titleCn: '外科藥物',
                  src: require('../../assets/category/topical.png'),
              },
        ],
        [
            {
                titleEn: 'Male',
                titleCn: '男性用藥',
                src: require('../../assets/category/male.png'),
            },
            {
                titleEn: 'Gynecological',
                titleCn: '婦科用藥',
                src: require('../../assets/category/gynecological.png'),
            },
            {
                titleEn: 'Ophthalmology',
                titleCn: '眼科用藥',
                src: require('../../assets/category/ophthalmology.png'),
            },
            {
                titleEn: 'Chronic',
                titleCn: '慢性藥物',
                src: require('../../assets/category/chronic.png'),
            },
            {
                titleEn: 'Supplement',
                titleCn: '保健食品', 
                src: require('../../assets/category/supplement.png'),
            },
        ]
    ];


    return (
        <View style={styles.container}>
            {
                catgoryIcons.map((item, key)=> <View style={styles.row} key={key}>{item.map((item1, key1) => <Category key={key1} path={item1.src} title={i18n.language==='en'?item1.titleEn:item1.titleCn}></Category>)}</View>)
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


export default CategoryContainer;