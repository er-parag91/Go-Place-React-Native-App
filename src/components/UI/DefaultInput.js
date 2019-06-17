import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = (props) => (
    <TextInput 
        placeholder={props.placeholder}
        style={styles.input}
        underlineColorAndroid="transparent"
        {...props}
    />
)

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth : 1,
        borderColor: '#eee',
        padding: 6,
        margin: 8
    }
})

export default DefaultInput;
