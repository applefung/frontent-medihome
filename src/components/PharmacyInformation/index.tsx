import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, ScrollView } from "react-native";

const PharmacyInformation = ({pharmacy}: any) => {
    const { i18n, t } = useTranslation("en");
    return (
        <ScrollView>
            <Text style={styles.title}>{i18n.language==='en'?pharmacy.name_en:pharmacy.name_cn}</Text>
            <Text style={styles.normalText}>{i18n.language==='en'?pharmacy.description_en:pharmacy.description_cn}</Text>
            <Text style={styles.normalText}>{i18n.language==='en'?pharmacy.address_en:pharmacy.address_cn}</Text>
            <Text style={styles.title}>{i18n.t('pharmacy.contact')}</Text>
            <Text style={styles.normalText}>{pharmacy.contact}</Text>
            <Text style={styles.title}>{i18n.t('pharmacy.businessTime')}</Text>
            <Text style={styles.normalText}>{pharmacy.business_time}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    title: {
       fontWeight: 'bold',
       fontSize: 20,
       marginVertical: 10,
       textAlign: 'center'
    },
    normalText: {
        textAlign: 'center'
    }
});

export default PharmacyInformation;