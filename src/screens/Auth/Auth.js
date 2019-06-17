import React, { Component } from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import StartMainTabs from '../MainTabs/MainTabs';
import DefaultInput from '../../components/UI/DefaultInput';

class Auth extends Component {

    LoginHandler = () => {
        StartMainTabs();
    }

    render(){
        return(
            <View style={styles.container}>
                <Text>Please Log In</Text>
                <Button title="Switch to Login" />
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="E-mail Address" />
                    <DefaultInput placeholder="Password" />
                    <DefaultInput placeholder="Confirm Password" />
                </View>
                <Button title="Submit" onPress={this.LoginHandler} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    }
});

export default Auth;