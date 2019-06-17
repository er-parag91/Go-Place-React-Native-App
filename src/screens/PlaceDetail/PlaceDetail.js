import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = (props) => {
    if (!props.selectedPlace) {
        return null;
    }
    return (
            <View style={styles.container}>
                <View>
                    <Image resizeMode="cover" source={props.selectedPlace.placeImage} style={styles.placeImage} />
                    <Text style={styles.title}>{props.selectedPlace.place}</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={props.itemDeleted}>
                        <View style={styles.deleteButton}>
                            <Icon size={30} name="ios-trash" color="red" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 22
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28
    },
    placeImage: {
        height: 200,
        width: '100%'
    },
    deleteButton: {
        alignItems: 'center'
    }
})

export default PlaceDetail;