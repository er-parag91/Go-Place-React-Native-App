import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../Assets/login.jpg';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import validate from '../../utility/validation';
import { connect } from 'react-redux';
import { auth, autoSignIn } from '../../store/action/index';


class Auth extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: '#212121',
        navBarTextColor: '#7ed56f'
    }

    constructor(props) {
        super(props);
        this.state = {
            authMode: 'login',
            viewMode: Dimensions.get("window").height > 500 ? 'portrait' : 'landscape',
            controls: {
                email: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        isEmail: true
                    }
                },
                password: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        minLength: 6
                    }
                },
                confirmPassword: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        toEqual: 'password'
                    }
                }
            }
        }
        Dimensions.addEventListener('change', this.updateStyle)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateStyle)
    }

    componentDidMount() {
        this.props.onAutoSignIn();
    }

    updateStyle = () => {
        this.setState({ viewMode: Dimensions.get("window").height > 500 ? 'portrait' : 'landscape' })
    }

    authModeSwitchHandler = () => {
        this.setState(prevState => {
            return { authMode: prevState.authMode === 'login' ? 'signup' : 'login' }
        })
    }

    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value,
        }
        this.props.onTryAuth(authData, this.state.authMode);
    }

    inputChangedHandler = (key, value) => {
        let connectedValue = {};

        if (this.state.controls[key].validationRules.toEqual) {
            const equalControl = 'password';
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                toEqual: equalValue
            }
        }

        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                toEqual: value
            }
        }

        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                            key === 'password'
                                ?
                                validate(
                                    prevState.controls.confirmPassword.value,
                                    prevState.controls.confirmPassword.validationRules,
                                    connectedValue
                                )
                                :
                                prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules, connectedValue),
                        touched: true
                    },
                }
            }
        })
    }

    render() {
        const { controls } = this.state;
        let headingText = null;
        const { viewMode } = this.state;
        if (viewMode === 'portrait') {
            headingText = (
                <MainText>
                    <HeadingText style={{ color: '#eee' }}>{this.state.authMode === 'login' ? 'Registered User' : 'New User'}</HeadingText>
                </MainText>
            );
        }

        if (this.props.loading) {
            submitButton = (
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="black"/>
                </View>
            )
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style={styles.login}>
                        {headingText}
                        <ButtonWithBackground color="#7ed56f" textColor="#333" onPress={this.authModeSwitchHandler}>
                            Switch to {this.state.authMode === 'login' ? 'Sign-up' : 'login'}
                        </ButtonWithBackground>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.inputContainer}>
                                <DefaultInput
                                    placeholder="E-mail Address"
                                    style={styles.input}
                                    value={controls.email.value}
                                    onChangeText={(value) => this.inputChangedHandler('email', value)}
                                    valid={!controls.email.valid}
                                    touched={controls.email.touched}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="email-address"
                                />
                                <View
                                    style={
                                        viewMode === 'portrait' || this.state.authMode === 'login'
                                            ?
                                            styles.portraitPasswordContainer
                                            :
                                            styles.landscapePasswordContainer
                                    }
                                >
                                    <View style={
                                        viewMode === 'portrait' || this.state.authMode === 'login'
                                            ?
                                            styles.portraitPasswordWrapper
                                            :
                                            styles.landscapePasswordWrapper
                                    }
                                    >
                                        <DefaultInput
                                            placeholder="Password"
                                            style={styles.input}
                                            value={controls.password.value}
                                            onChangeText={(value) => this.inputChangedHandler('password', value)}
                                            valid={!controls.password.valid}
                                            touched={controls.password.touched}
                                            secureTextEntry
                                        />
                                    </View>
                                    {this.state.authMode === 'signup' &&
                                        <View style={viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                                            <DefaultInput
                                                placeholder="Confirm Password"
                                                style={styles.input}
                                                value={controls.confirmPassword.value}
                                                onChangeText={(value) => this.inputChangedHandler('confirmPassword', value)}
                                                valid={!controls.confirmPassword.valid}
                                                touched={controls.confirmPassword.touched}
                                                secureTextEntry
                                            />
                                        </View>}
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                        <ButtonWithBackground
                            onPress={this.authHandler}
                            color="#333"
                            textColor="#28b485"
                            width="50%"
                            disabled={
                                !controls.email.valid ||
                                !controls.password.valid ||
                                !controls.confirmPassword.valid && this.state.authMode === 'signup'
                            }
                        >
                            Login
                        </ButtonWithBackground>
                    </View>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        backgroundColor: '#00000066',
        width: '90%',
        borderRadius: 15,
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
    },
    loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const mapStateToProps = (state) => {
    return {
        loading: state.loading.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(auth(authData, authMode)),
        onAutoSignIn: () => dispatch(autoSignIn())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);