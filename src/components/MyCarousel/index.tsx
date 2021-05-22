import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { CarouselType } from '../../types/models/Carousel';

const MyCarousel = ({carouselItems}:any)=> {
    const [activeIndex, setActiveIndex] = useState(0);
    const [carousel, setCarousel] = useState();
    const _renderItem = ({item, index}:any) => {
        return (
            <View key={index}>
                <Image style={styles.image} source={{uri: item.image}} />
            </View>
        );
    }

    return (
        <View>
            <Carousel
                layout={"default"}
                ref={(ref:any) => setCarousel(ref)}
                data={carouselItems}
                sliderWidth={400}
                itemWidth={400}
                renderItem={_renderItem}
                onSnapToItem = { index => setActiveIndex(index) } 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        height: 120,
        width: '100%',
    },
});

export default MyCarousel;