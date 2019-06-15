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
import PlaceDetail from './src/PlaceDetail/PlaceDetail';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    places: [],
    selectedPlace: null
  }

  onChangeHandler = (event) => {
    this.setState({ placeName: event })
  }

  placeSubmitHandler = (place) => {
    let places = [...this.state.places];
    places = [...places,
    {
      place,
      key: Math.random(),
      placeImage: {
        uri: 'https://images.pexels.com/photos/355296/pexels-photo-355296.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
      }
    }];
    this.setState({ places })
  }

  onPlaceSelected = (index) => {
    this.setState((prevState) => {
      return { selectedPlace: prevState.places.find((place, i) => {
        return i === index;
      }) };
    })
  }

  modalCloseHandler = () => {
    this.setState({ selectedPlace: null });
  }

  placeDeleted = () => {
    this.setState((prevState => {
      return { places: prevState.places.filter(place => {
        return place.key !== this.state.selectedPlace.key
      }), selectedPlace: null }
    }))
  }

  render() {
    return (
      <View style={styles.container}>
        <PlaceDetail
          selectedPlace={this.state.selectedPlace}
          itemDeleted={this.placeDeleted}
          modalClosed={this.modalCloseHandler}
          />
        <PlaceInput placeSubmitHandler={this.placeSubmitHandler} />
        <PlacesList places={this.state.places} onPlaceSelected={this.onPlaceSelected} />
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

export default connect()(App);