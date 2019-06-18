import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = (props) => (
    <TextInput 
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.input, props.style, props.valid && props.touched ? styles.invalidInput : null]}
    />
)

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth : 1,
        borderColor: '#eee',
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    },
    invalidInput: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red'
    }
})

export default DefaultInput;
