import React from 'react';
import { Modal, View, Text, Image, Button, StyleSheet } from 'react-native';

const PlaceDetail = (props) => {
    if ( !props.selectedPlace ) {
        return null;
    }
    console.warn(props.selectedPlace.placeImage, 'fewwewe')
    return (
        <Modal animationType="slide" style={styles.ModalContainer} onRequestClose={props.modalClosed}>
            <View>
                <Image resizeMode="cover" source={props.selectedPlace.placeImage}  style={styles.placeImage} />
                <Text style={styles.title}>{props.selectedPlace.place}</Text>
                <View>
                    <Button title="Delete" onPress={props.itemDeleted} />
                </View>
                <View>
                    <Button title="Cancel" onPress={props.modalClosed} />
                </View>
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
    }
})

export default PlaceDetail;