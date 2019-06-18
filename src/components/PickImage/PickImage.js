import React, { Component } from 'react';
import { View , Image, Button, StyleSheet} from 'react-native';
import imagePlaceHolder from '../../Assets/imagePlaceholder.jpg';

class PickImage extends Component{
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={imagePlaceHolder} style={styles.imagePlaceHolder} />
                </View>
                <View style={styles.button}>
                    <Button title="Select Image" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholder: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#ddd',
        width: '80%',
        height: 200
    },
    button: {
        margin: 8
    },
    imagePlaceHolder: {
        width: '100%',
        height: '100%'
    }
})

export default PickImage;