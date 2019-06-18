import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';

const ButtonWithBackground = props => {

    const content = (
        <View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null]}>
            <Text style={{ textAlign: 'center' }}>{props.children}</Text>
        </View>
    )
    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.onPress} style={{ width: props.width}}>
            {content}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        padding: 10,  
        margin: 5,
        borderRadius: 25,
    },
    disabled: {
        backgroundColor: '#eee',
        color: '#aaa'
    }
})

export default ButtonWithBackground;