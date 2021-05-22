import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPharmacyComment } from '../../actions/pharmacyComment';
import Spinner from 'react-native-loading-spinner-overlay';
import { RootState } from '../../store/store';
import { PharmacyCommentType } from '../../types/models/PharmacyComment';
import { Rating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';

type CommentPropType = {
    pharmacyId: number;
};

const Comment = ({pharmacyId}: CommentPropType) => {
    const dispatch = useDispatch();
    const { i18n, t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const availableComment:any = useSelector<RootState>(state=>state.PharmacyComment.PharmacyComment)

    useEffect(()=>{
        setIsLoading(true);
        dispatch(getAllPharmacyComment(pharmacyId)).then(()=>{
            setIsLoading(false);
        })
    }, []);

    return(
        <ScrollView>
            {
                isLoading?
                <Spinner
                    visible={isLoading}
                    textContent={i18n.t('loading')}
                    textStyle={styles.spinnerTextStyle}
                />:null
            }
            {
                availableComment.length?
                availableComment.map((element: PharmacyCommentType, index: number) => (
                    <View key={index} style={styles.commentContainer}>
                        <Rating
                            showRating
                            ratingColor='#ffff33'
                            ratingBackgroundColor='#ffffff'
                            ratingTextColor='#000000'
                            type='custom'
                            startingValue={element.rating}
                            style={styles.rating}
                        />
                        <Text style={styles.contentText}>{element.content}</Text>
                        <View style={styles.bottomContainer}>
                            <View style={styles.bottomInsideContainer}>
                                <Text>{i18n.t('pharmacy.writer')}: </Text>
                                <Text>{element.customer_user.name}</Text>
                            </View>
                            <View style={styles.bottomInsideContainer}>
                                <Text>{i18n.t('pharmacy.date')}: </Text>
                                <Text>{element.comment_date}</Text>
                            </View>
                        </View>
                    </View>
                ))
                : null
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
    rating: {
        paddingVertical: 10
    },
    bottomContainer: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    commentContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#dcdcdc',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    contentText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    bottomInsideContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default Comment;