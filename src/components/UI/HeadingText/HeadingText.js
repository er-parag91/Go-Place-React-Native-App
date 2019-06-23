import React from 'react';
import { Text, StyleSheet, MaskedViewIOS } from 'react-native';

const HeadingText = props => (
            <Text {...props}  style={[styles.HeadingText, props.style]}>{props.children}</Text>
)

const styles = StyleSheet.create({
    HeadingText: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default HeadingText;