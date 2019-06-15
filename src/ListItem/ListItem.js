import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ListItem = (props) => {
    return (
    <TouchableOpacity style={styles.ListItem} onPress={props.onItemPressed}>
        <View>
            <Text>{props.placeName}</Text>
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
    }
})

export default ListItem;