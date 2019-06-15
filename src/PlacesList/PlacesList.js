import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ListItem from '../ListItem/ListItem';

const PlacesList = (props) => {

    const placesOutput = props.places.map((place, index) => {
        return <ListItem key={index} placeName={place} onItemPressed={() => props.onItemDeleted(index)} />
    });

    return (
        <ScrollView contentContainerStyle={styles.placesContainer}>
            {placesOutput}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    placesContainer: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});

export default PlacesList;