/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PlaceInput from './src/PlaceInput/PlaceInput';
import PlacesList from './src/PlacesList/PlacesList';
import placeImage from './src/Assets/image.jpg';

export default class App extends Component {
  state = {
    places: []
  }

  onChangeHandler = (event) => {
    this.setState({ placeName: event })
  }

  placeSubmitHandler = (place) => {
    let places = [...this.state.places];
    places = [...places,
              {
                place,
                placeImage: {uri: 'https://images.pexels.com/photos/355296/pexels-photo-355296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
              }}];
    this.setState({ places })
  }

  itemDeleteHandler = (index) => {
    this.setState((prevState) => {
      return {
        places: prevState.places.filter((place, i) => {
          return i!== index;
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceInput placeSubmitHandler={this.placeSubmitHandler} />
        <PlacesList  places={this.state.places} onItemDeleted={this.itemDeleteHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    justifyContent: 'flex-start',
    backgroundColor: '#F5FCFF',
  }
});
