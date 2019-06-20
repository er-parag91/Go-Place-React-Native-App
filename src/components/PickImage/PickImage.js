import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceHolder from '../../Assets/imagePlaceholder.jpg';
import ImagePicker from 'react-native-image-picker';

class PickImage extends Component {

    state = {
        avatarSource: imagePlaceHolder
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Select Photo'}, response => {
            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: Most likely permission denied ');
            } else {
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                });
                this.props.onImagePicked({ uri: response.uri });
            }
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.avatarSource} style={styles.imagePlaceHolder} />
                </View>
                <View style={styles.button}>
                    <Button title="Select Image" onPress={this.pickImageHandler} />
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
        height: 250
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