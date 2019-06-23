import React, { Component } from 'react';
import { View, Image, Button, StyleSheet } from 'react-native';
import imagePlaceHolder from '../../Assets/imagePlaceholder.jpg';
import ImagePicker from 'react-native-image-picker';
import ButtonWithBackground from '../UI/ButtonWithBackground/ButtonWithBackground';

class PickImage extends Component {

    state = {
        avatarSource: imagePlaceHolder
    }

    reset = () => {
        this.setState({ avatarSource: imagePlaceHolder });
    };

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: 'Select Photo', maxHeight: 600, maxWidth: 600 }, response => {
            if (response.didCancel) {
                alert('User cancelled image picker');
            } else if (response.error) {
                alert('ImagePicker Error: Most likely permission denied ');
            } else {
                const source = { uri: response.uri };
                this.setState({
                    avatarSource: source,
                });
                this.props.onImagePicked({ uri: response.uri, base64: response.data });
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
                    <ButtonWithBackground 
                        title="Upload Image" 
                        onPress={this.pickImageHandler} 
                        color="#333"
                        textColor="#7ed56f"
                        width="60%"
                    >Upload Photo</ButtonWithBackground>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40
    },
    placeholder: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#ddd',
        width: '80%',
        height: 250
    },
    button: {
        margin: 8,
        width: '60%',
        alignItems: 'center'
    },
    imagePlaceHolder: {
        width: '100%',
        height: '100%'
    }
})

export default PickImage;