import React from 'react';
import { StyleSheet, FlatList, sty } from 'react-native';
import ListItem from '../ListItem/ListItem';

const PlacesList = (props) => {


    return (
        <FlatList
            contentContainerStyle={styles.placesContainer}
            data={props.places}
            keyExtractor={(item, index) => item + index}
            extraData={props.places}
            renderItem={(info) => {
               return <ListItem
                    placeName={info.item.place}
                    placeImage={info.item.placeImage}
                    onItemPressed={() => props.onPlaceSelected(info.item.key)}
                />
            }}
        />
    )
}

const styles = StyleSheet.create({
    placesContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start'
    }
});

export default PlacesList;