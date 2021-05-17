import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Image, StyleSheet } from 'react-native';

const SloganContainer = () => {
    const { i18n, t } = useTranslation("en");
    const sloganIcons = [
        {
            titleEn: 'Safe',
            titleCn: '安全',
            src: require('../../assets/slogan/safety.png'),
            },
            {
                titleEn: 'Quick',
                titleCn: '快捷',
                src: require('../../assets/slogan/time.png'),
            },
            {
                titleEn: 'Private',
                titleCn: '私隱',
                src: require('../../assets/slogan/key.png'),
            },
            {
                titleEn: 'Liable',
                titleCn: '可信',
                src: require('../../assets/slogan/doctor.png'),
            },
    ];

    return (
        <View style={styles.container} >
            {
                sloganIcons.map((item, key) => 
                <View style={styles.iconContainer} key={key}>
                    {/*// @ts-ignore */}
                    <Image style={styles.image} resizeMode="contain" source={item.src}></Image>
                    <Text style={styles.text} >{i18n.language==='en'?item.titleEn:item.titleCn}</Text>
                </View>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#000000',
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 5,
    },
    image: {
        resizeMode: 'contain',
        height: 20,
    },
    iconContainer: {
        alignItems: 'center',
        width: '25%'
    },
    text: {
        fontSize: 10,
    }
});

export default SloganContainer;