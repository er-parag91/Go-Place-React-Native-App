import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

class PlaceInput extends Component {
    state = {
        placeName: '',
    }

    onChangeHandler = (event) => {
        this.setState({ placeName: event })
    }

    placeSubmitHandler = (value) => {
        if (value.trim() === "") {
            return;
        }
        this.setState({ placeName: '' })
        this.props.placeSubmitHandler(value)
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="An Awesome place"
                    style={{ width: 300, borderBottomColor: 'lightblue', borderBottomWidth: 2, fontSize: 17, padding: 5 }}
                    value={this.state.placeName}
                    onChangeText={this.onChangeHandler}
                />
                <Button title="Add" onPress={() => this.placeSubmitHandler(this.state.placeName)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});

export default PlaceInput;