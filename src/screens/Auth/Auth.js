import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native';
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
        let headingText = null;

        if (Dimensions.get("window").height > 500) {
            headingText = (
                <MainText>
                    <HeadingText>Please Log In</HeadingText>
                </MainText>
            );
        }
        return(
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.login}>
                        {headingText}
                        <ButtonWithBackground color="#29aaf4" onPress={() => alert('Hello')}>Switch to Login</ButtonWithBackground>
                        <View style={styles.inputContainer}>
                            <DefaultInput placeholder="E-mail Address" style={styles.input} />
                            <View style={styles.passwordContainer}>
                                <View style={styles.passwordWrapper}>
                                    <DefaultInput placeholder="Password" style={styles.input} />
                                </View>
                                <View style={styles.passwordWrapper}>
                                    <DefaultInput placeholder="Confirm Password" style={styles.input} />
                                </View>
                            </View>
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
        paddingTop: 25,
        paddingBottom: 25
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    passwordContainer: {
        width: "100%",
        flexDirection: Dimensions.get("window").height > 500 ? 'column' : 'row',
        justifyContent: 'space-between'
    },
    passwordWrapper: {
        width: Dimensions.get("window").height > 500 ? '100%' : '48%'
    }
});

export default Auth;