import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native';
import StartMainTabs from '../MainTabs/MainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../Assets/background.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            viewMode: Dimensions.get("window").height > 500 ? 'portrait' : 'landscape'
        }
        Dimensions.addEventListener('change', () => {
            this.setState({ viewMode: Dimensions.get("window").height > 500 ? 'portrait' : 'landscape' })
        })
    }

    LoginHandler = () => {
        StartMainTabs();
    }

    render(){
        let headingText = null;
        const { viewMode } = this.state;
        if (viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText style={{ color: '#ddd' }}>Please Log In</HeadingText>
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
                            <View 
                                style={ viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer }
                            >
                                <View style={ viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
                                    <DefaultInput placeholder="Password" style={styles.input} />
                                </View>
                                <View style={ viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper }>
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
    portraitPasswordContainer: {
        width: "100%",
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordWrapper: {
        width: '100%'
    },
    landscapePasswordWrapper: {
        width: '48%'
    }
});

export default Auth;