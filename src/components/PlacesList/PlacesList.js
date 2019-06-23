import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import ListItem from '../ListItem/ListItem';
import ButtonWithBackground from '../UI/ButtonWithBackground/ButtonWithBackground';

const PlacesList = (props) => {

    addPlaceHandler = () => {
        console.warn('I am pressed')
    }

    if (props.places.length === 0) {
        return (
            <View>
                <Text style={styles.emptyTitle}>Aw! Snap</Text>
                <Text style={styles.emptyText}>Looks like your places list is empty</Text>
                <ButtonWithBackground 
                    onPress={this.addPlaceHandler}
                    color="#333"
                    textColor="#28b485"
                >
                Add Place
                </ButtonWithBackground>
            </View>
        )
    }
    return (
        <FlatList
            contentContainerStyle={styles.placesContainer}
            data={props.places}
            keyExtractor={(item, index) => item + index}
            extraData={props.places}
            renderItem={(info) => {
               return <ListItem
                    placeName={info.item.placeName}
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
    },
    emptyTitle: {
        fontSize: 14,
        color: '#444'
    },
    emptyText:{
        fontSize: 11,
        color: '#444'
    }
});

export default PlacesList;