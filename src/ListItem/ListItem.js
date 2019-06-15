import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onItemPressed}>
            <View style={styles.ListItem}>
                <Image resizeMode="cover" source={props.placeImage}  style={styles.placeImage} />
                <Text style={{ marginLeft: 8 }}>{props.placeName}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ListItem: {
        width: '100%',
        padding: 10,
        color: 'red',
        backgroundColor: '#eee',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeImage: {
        marginRight: 8,
        height: 50,
        width: 50
    }
})

export default ListItem;