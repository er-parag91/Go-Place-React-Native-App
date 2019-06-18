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
            responsiveStyle: {
                pwdContainerFlex: 'column',
                pwdContainerContent: 'flex-start',
                pwdWrapperWidth: '100%'
            }
        }
        Dimensions.addEventListener('change', (event) => {
            this.setState({
                responsiveStyle: {
                    pwdContainerFlex: Dimensions.get("window").height > 500 ? 'column' : 'row',
                    pwdContainerContent: Dimensions.get("window").height > 500 ? 'flex-start' : 'space-between',
                    pwdWrapperWidth: Dimensions.get("window").height > 500 ? '100%' : '50%'
                }
            })
        })
    }

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
                            <View 
                                style={{ 
                                        flexDirection: this.state.responsiveStyle.pwdContainerFlex, 
                                        justifyContent: this.state.responsiveStyle.pwdContainerContent
                                        }}
                            >
                                <View style={{ width: this.state.responsiveStyle.pwdWrapperWidth }}>
                                    <DefaultInput placeholder="Password" style={styles.input} />
                                </View>
                                <View style={{ width: this.state.responsiveStyle.pwdWrapperWidth }}>
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