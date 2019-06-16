// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  */

// import React, { Component } from 'react';
// import { StyleSheet, View } from 'react-native';
// import PlaceInput from './src/PlaceInput/PlaceInput';
// import PlacesList from './src/PlacesList/PlacesList';
// import PlaceDetail from './src/PlaceDetail/PlaceDetail';
// import { connect } from 'react-redux';
// import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/action/places';

// class App extends Component {

//   onChangeHandler = (event) => {
//     this.setState({ placeName: event })
//   }

//   placeSubmitHandler = (place) => {
//       this.props.onAddPlace(place)
//   }

//   onPlaceSelected = (index) => {
//       this.props.selectPlace(index);
//   }

//   modalCloseHandler = () => {
//     this.props.deselectPlace()
//   }

//   placeDeleted = () => {
//     this.props.onDeletePlace()
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <PlaceDetail
//           selectedPlace={this.props.selectedPlace}
//           itemDeleted={this.placeDeleted}
//           modalClosed={this.modalCloseHandler}
//           />
//         <PlaceInput placeSubmitHandler={this.placeSubmitHandler} />
//         <PlacesList places={this.props.places} onPlaceSelected={this.onPlaceSelected} />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 26,
//     justifyContent: 'flex-start',
//     backgroundColor: '#F5FCFF',
//   }
// });

// const mapStateToProp = (state) => {
//   return {

//     places: state.places.places,
//     selectedPlace: state.places.selectedPlace
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAddPlace: (place) => dispatch(addPlace(place)),
//     onDeletePlace: () => dispatch(deletePlace()),
//     selectPlace: (index) => dispatch(selectPlace(index)),
//     deselectPlace: () => dispatch(deselectPlace())
//   }
// }

// export default connect(mapStateToProp, mapDispatchToProps)(App);


import { Navigation } from 'react-native-navigation';
import Auth from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlaceScreen/FindPlaceScreen';
import ShareScreenPlace from './src/screens/ShareScreenPlace/ShareScreenPlace';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent("Go-places.AuthScreen", () => Auth, store, Provider);
Navigation.registerComponent("Go-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("Go-places.ShareScreenPlace", () => ShareScreenPlace, store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: "Go-places.AuthScreen",
    title: "Login"
  }
});