import React, { Component } from 'react';
import { Text, View } from 'react-native';
import StartMainTabs from '../MainTabs/MainTabs';

class Auth extends Component {

    LoginHandler = () => {
        StartMainTabs();
    }

    render(){
        return(
            <View>
                <Text onPress={this.LoginHandler}>Auth screen</Text>
            </View>
        )
    }
}

export default Auth;