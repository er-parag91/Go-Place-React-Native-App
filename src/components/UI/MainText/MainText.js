import React from 'react';
import { Text, StyleSheet } from 'react-native';


const MainText = props => (
    <Text style={styles.MainText}>{props.children}</Text>
);

const styles = StyleSheet.create({
    MainText: {
        color: '#333',
        lineHeight: 60
    }
})

export default MainText;