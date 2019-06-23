import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, TouchableNativeFeedback, Platform } from 'react-native';

const ButtonWithBackground = props => {

    alertHandler = () => {
        alert('Please Fill in enough details to submit')
    }

    const content = (
        <View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null]}>
            <Text 
                style={[ 
                        { 
                        textAlign: 'center', 
                        color: props.textColor, 
                        fontSize: 16,
                        fontFamily: 'AppleSDGothicNeo-Regular' },
                        props.disabled ? styles.disabledText 
                        : 
                        null
                        ]
                        }
            >
                {props.children}
            </Text>
        </View>
    )

    if (Platform.OS === 'android') {
        return (
            <TouchableNativeFeedback onPress={props.disabled ? this.alertHandler : props.onPress} style={{ width: props.width}}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return (
        <TouchableOpacity onPress={props.disabled ? this.alertHandler : props.onPress} style={{ width: props.width}}>
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
        backgroundColor: '#666',
    },
    disabledText: {
        color: '#eee'
    }
})

export default ButtonWithBackground;