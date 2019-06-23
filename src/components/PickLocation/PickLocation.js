import React, { Component } from 'react';
import { View, Button, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import ButtonWithBackground from '../UI/ButtonWithBackground/ButtonWithBackground';

class PickLocation extends Component {
    state={};

    componentWillMount(){
        this.reset();
    }


    reset = () => {
        this.setState({
            focusedLocation: {
                latitude: 37.7900352,
                longitude: -122.4013726,
                latitudeDelta: 0.0122,
                longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
            },
            pickedLocation: null
        })
    }
    pickLocationHandler = (event) => {
        const coords = event.nativeEvent.coordinate;
        this.setState(prevState => {
            return {
                focusedLocation: {
                    ...prevState.focusedLocation,
                    latitude: coords.latitude,
                    longitude: coords.longitude
                },
                pickedLocation: true
            }
        })
        this.map.animateToRegion({
            ...this.state.focusedLocation,
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        this.props.onLocationPick({
            latitude: coords.latitude, longitude:coords.longitude
        })
    }

    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(pos => {
            const coordsEvent = {
                nativeEvent: {
                    coordinate: {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    }
                }
            }
            this.pickLocationHandler(coordsEvent);
        }, err => {
            alert('Fetching current position failed, Please pick your location manually')
        })
    }

    render() {
        let marker = null;
        if (this.state.pickedLocation) {
            marker = <MapView.Marker coordinate={this.state.focusedLocation} />
        }
        return (
            <View style={styles.container}>
                <MapView
                    initialRegion={this.state.focusedLocation}
                    region={!this.state.pickedLocation ? this.state.focusedLocation : null}
                    style={styles.map}
                    onPress={this.pickLocationHandler}
                    ref={ref => this.map = ref}
                >
                    {marker}
                </MapView>
                <View style={styles.button}>
                    <ButtonWithBackground 
                        onPress={this.getLocationHandler} 
                        color="#333"
                        textColor="#7ed56f"
                        width="60%"
                    >Get Your Location</ButtonWithBackground>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: 'black',
        shadowOffset:{  width: 5,  height: 6,  },
        shadowOpacity: 0.3
    },
    map: {
        width: '80%',
        height: 250
    },
    button: {
        margin: 8,
        width: '80%',
        alignItems: 'center'
    },
    imagePlaceHolder: {
        width: '100%',
        height: '100%'
    }
})

export default PickLocation;