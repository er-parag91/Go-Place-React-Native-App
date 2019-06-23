import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { deletePlace, startPlaceDelete} from '../../store/action/index';
import MapView from 'react-native-maps';
import Spinner from 'react-native-loading-spinner-overlay';

class PlaceDetail extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: '#212121',
        navBarTextColor: '#7ed56f',
        navBarButtonColor: 'red'
    }
    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'portrait',
        }
        Dimensions.addEventListener('change', this.updateStyle);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'ScreenChangedEvent') {
            if (event.id === 'willAppear') {
                this.props.onDeletePlaceStart()
            }
        }
        if (event.id === 'deleteButton') {
            this.props.onPlaceDelete(this.props.selectedPlace.key);
        }
    }

    
    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.updateStyle)
    }

    componentDidUpdate(){
        if(this.props.placeDeleted) {
            this.props.navigator.pop();
        }
    }

    updateStyle = (event) => {
        this.setState({
            viewMode: event.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

    render() {
        if (!this.props.selectedPlace.placeDescription) {
            placeinfo = "No information available"
        } else {
            placeinfo = this.props.selectedPlace.placeDescription
        }
        return (
            <View style={[styles.container, this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]}>
                <View style={styles.subContainer}>
                    <Image resizeMode="cover" source={this.props.selectedPlace.placeImage} style={styles.placeImage} />
                </View>

                <View style={styles.subContainer}>
                    <MapView
                        initialRegion={{
                            ...this.props.selectedPlace.location,
                            latitudeDelta: 0.0122,
                            longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
                        }}
                        style={styles.map}
                    >
                        <MapView.Marker coordinate={this.props.selectedPlace.location}/>
                    </MapView>
                </View>

                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.title}>Place Information</Text>
                        <Text style={styles.name}>{this.props.selectedPlace.placeName}</Text>
                        <Text style={styles.description}>{placeinfo}</Text>
                    </View>
                    </View>                    
                    <Spinner
                            visible={this.props.isLoading}
                            textStyle={styles.spinnerTextStyle}
                            overlayColor="#00000077"
                        />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 14,
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
        margin: 5
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 4,
        borderColor: '#333'
    },
    description: {
        textAlign: 'left',
        fontWeight: '200',
    },
    title: {
        textAlign: 'left',
        fontWeight: "700",
        fontSize: 16,
        marginBottom: 15
    },
    name: {
        textAlign: 'left',
        fontWeight: "500",
        marginBottom: 8
    },
    placeImage: {
        height: '100%',
        width: '100%',
        borderWidth: 9,
        borderColor: '#333'
    },
    deleteButton: {
        alignItems: 'center'
    },
    spinnerTextStyle: {
        color: '#ddd'
      }
})

const mapStateToProps = (state) => {
    return {
        placeDeleted: state.places.placeDeleted,
        isLoading: state.loading.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onPlaceDelete: (placeKey) => dispatch(deletePlace(placeKey)),
        onDeletePlaceStart: () => dispatch(startPlaceDelete())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);