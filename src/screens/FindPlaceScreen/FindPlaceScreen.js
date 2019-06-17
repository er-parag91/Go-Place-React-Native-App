import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PlacesList from '../../PlacesList/PlacesList';

class FindPlaceScreen extends Component {

    itemSelectedHandler = (key) => {
        const selectedPlace = this.props.places.find(place => {
            return place,key === key;
        })
        this.props.navigator.push({
            screen: 'Go-places.PlaceDetail',
            title: selectedPlace.place,
            passProps: {
                selectedPlace: selectedPlace
            }
        })
    }

    render(){
        return(
            <View>
                <PlacesList places={this.props.places} onPlaceSelected={this.itemSelectedHandler} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.places.places
    }
}

export default connect(mapStateToProps)(FindPlaceScreen);