import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const SideDrawer = () => (
    <View style={[styles.container, { width: Dimensions.get("window").width * 0.8 }]}>
        <TouchableOpacity>
            <View style={styles.logOut}>
                <Icon name="ios-log-out" size={30} color="#999"/>
                <Text style={{ marginLeft: 10 }}>SideDrawer</Text>
            </View>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: 'white',
        flex: 1
    },
    logOut: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    }

});

export default SideDrawer;