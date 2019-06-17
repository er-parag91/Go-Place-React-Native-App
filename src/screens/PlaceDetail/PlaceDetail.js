import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = (props) => {
    if (!props.selectedPlace) {
        return null;
    }
    return (
            <View>
                <Image resizeMode="cover" source={props.selectedPlace.placeImage} style={styles.placeImage} />
                <Text style={styles.title}>{props.selectedPlace.place}</Text>
                <TouchableOpacity>
                    <View style={styles.deleteButton}>
                        <Icon onPress={props.itemDeleted} size={30} name="ios-trash" color="red" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Button title="Cancel" onPress={props.modalClosed} />
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18
    },
    placeImage: {
        marginRight: 8,
        height: 200,
        width: '100%'
    },
    deleteButton: {
        alignItems: 'center'
    }
})

export default PlaceDetail;