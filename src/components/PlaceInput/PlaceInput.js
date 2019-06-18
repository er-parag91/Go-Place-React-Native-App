import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import DefaultInput from '../UI/DefaultInput/DefaultInput';

class PlaceInput extends Component {
    state = {
        placeName: '',
    }

    onChangeHandler = (event) => {
        this.setState({ placeName: event })
    }

    render() {
        return (
            <DefaultInput 
                placeholder="Place Name"
                value={this.state.placeName}
                onChangeText={this.onChangeHandler}
            />
        )
    }
}

const styles = StyleSheet.create({

});

export default PlaceInput;