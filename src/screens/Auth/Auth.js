import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';
import StartMainTabs from '../MainTabs/MainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../Assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class Auth extends Component {

    LoginHandler = () => {
        StartMainTabs();
    }

    render(){
        return(
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.login}>
                        <MainText>
                            <HeadingText>Please Log In</HeadingText>
                        </MainText>
                        <ButtonWithBackground color="#29aaf4" onPress={() => alert('Hello')}>Switch to Login</ButtonWithBackground>
                        <View style={styles.inputContainer}>
                            <DefaultInput placeholder="E-mail Address" style={styles.input} />
                            <DefaultInput placeholder="Password" style={styles.input} />
                            <DefaultInput placeholder="Confirm Password" style={styles.input} />
                        </View>
                        <ButtonWithBackground onPress={this.LoginHandler} color="#29aaf4">Login</ButtonWithBackground>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        flex:1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        backgroundColor: '#00000066',
        width: '90%',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    }
});

export default Auth;