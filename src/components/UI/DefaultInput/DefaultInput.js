import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const DefaultInput = (props) => (
    <TextInput 
        placeholder={props.placeholder}
        underlineColorAndroid="transparent"
        {...props}
        style={[styles.input, props.style]}
    />
)

const styles = StyleSheet.create({
    input: {
        width: '100%',
        borderBottomWidth : 1,
        borderColor: '#eee',
        padding: 10,
        margin: 10,
    }
})

export default DefaultInput;
