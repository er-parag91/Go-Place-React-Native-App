import React from 'react';
import { Modal, View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PlaceDetail = (props) => {
    if (!props.selectedPlace) {
        return null;
    }
    return (
        <Modal animationType="slide" style={styles.ModalContainer} onRequestClose={props.modalClosed}>
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
        </Modal>
    )
}

const styles = StyleSheet.create({
    ModalContainer: {
        margin: 20
    },
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