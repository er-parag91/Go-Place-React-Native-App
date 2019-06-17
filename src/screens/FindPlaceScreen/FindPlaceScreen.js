import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PlacesList from '../../PlacesList/PlacesList';

class FindPlaceScreen extends Component {
    constructor(props) {
        super(props);

        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'SideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }

    itemSelectedHandler = (key) => {
        const selectedPlace = this.props.places.find(place => {
            return place.key === key;
        })
        this.props.navigator.push({
            screen: 'Go-places.PlaceDetail',
            title: selectedPlace.place,
            passProps: {
                selectedPlace: selectedPlace
            }
        })
    }

    render() {
        return (
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