import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Image, Platform, NativeModules, useWindowDimensions, TouchableOpacity, ScrollView } from "react-native";
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { PharmacyType } from '../../types/models/Pharmacy';
import ProductCard from '../../components/ProductCard';
import PharmacyHome from '../../components/PharmacyHome';
import PharmacyAll from '../../components/PharmacyAll';
import PharmacyInformation from '../../components/PharmacyInformation';
import { TabView, SceneMap } from 'react-native-tab-view';

const Pharmacy = ({route}: any) => {
    const pharmacyId =  route.params.pharmacyId;
    const availablePharmacy:any = useSelector<RootState>(state => state.Pharmacy.Pharmacy);
    const foundPharmacy = availablePharmacy.find((element:PharmacyType)=>element.pharmacy_id === parseInt(pharmacyId));

    const FirstRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fafafa', marginTop: 15 }} >
            <PharmacyHome pharmacy={foundPharmacy}/>
        </View>
      );
      
      const SecondRoute = () => (
        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
            <PharmacyAll pharmacy={foundPharmacy}/>
        </View>
      );
      
      const ThirdRoute = () => (
          <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
      );
      
      const FourthRoute = () => (
          <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
              <PharmacyInformation pharmacy={foundPharmacy}/>
          </View>
      );

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home' },
    { key: 'all', title: 'All' },
    { key: 'comment', title: 'Comment' },
    { key: 'information', title: 'Information' },
  ]);

  const renderScene = SceneMap({
    home: FirstRoute,
    all: SecondRoute,
    comment: ThirdRoute,
    information: FourthRoute,
  });

  return (
    <View style={styles.screen}>
        <ProductCard product={foundPharmacy}/>
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor:'#ffffff'
    },
});

export default Pharmacy;