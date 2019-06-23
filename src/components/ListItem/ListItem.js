import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = (props) => {
    return (
        <TouchableOpacity onPress={props.onItemPressed}>
            <View style={styles.ListItem}>
                <Image resizeMode="cover" source={props.placeImage}  style={styles.placeImage} />
                <Text style={{ marginLeft: 8, color: 'white', fontSize: 16 }}>{props.placeName}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    ListItem: {
        width: '100%',
        padding: 10,
        backgroundColor: '#55c57a',
        marginBottom: 5,
        marginTop: 5,
        paddingLeft: 34,
        flexDirection: 'row',
        borderRadius: 40,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset:{  width: 1,  height: 11,  },
        shadowOpacity: 0.2
    },
    placeImage: {
        marginRight: 8,
        height: 50,
        width: 50,
        borderWidth: 0.5,
        borderColor: '#999'
    }
})

export default ListItem;