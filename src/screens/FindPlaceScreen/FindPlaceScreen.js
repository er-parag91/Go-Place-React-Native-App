import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Platform, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import PlacesList from '../../components/PlacesList/PlacesList';
import Icon from 'react-native-vector-icons/Ionicons';
import { getPlaces } from '../../store/action/places';


class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#33cc33',
        navBarBackgroundColor: '#4d4d4d'
    }

    constructor(props) {
        super(props);
        this.state = {
            placesLoaded: false,
            removeAnimation: new Animated.Value(1),
            placesAnimation: new Animated.Value(0)
        }
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

    componentDidMount(){
        this.props.onLoadPlaces()
        console.warn('component did mount')
    }

    placesLoadedHandler = () => {
        Animated.timing(this.state.placesAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }
    
    placesSearchHandler = () => {
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            this.setState({
                placesLoaded: true
            })
            this.placesLoadedHandler();
        });
    }

    itemSelectedHandler = (key) => {
        const selectedPlace = this.props.places.find(place => {
            return place.key === key;
        })
        Promise.all([
            Icon.getImageSource(Platform.OS === 'android' ? "md-trash" : "ios-trash", 30)
        ]).then(sources => {
            this.props.navigator.push({
                screen: 'Go-places.PlaceDetail',
                title: selectedPlace.placeName,
                passProps: {
                    selectedPlace: selectedPlace
                },
                navigatorButtons: {
                    rightButtons: [
                        {
                            icon: sources[0],
                            id: 'deleteButton'
                        }
                    ]
                }
            })
        })
    }

    render() {

        let content = <ActivityIndicator />
        if (!this.props.loading) {
            content = (
                <Animated.View 
                    style={{ 
                    opacity: this.state.removeAnimation,
                    transform: [
                        {
                            scale: this.state.removeAnimation.interpolate({
                                inputRange: [0, 1],
                                outputRange: [3, 1]
                            })
                        }
                    ]
                    }}
                >
                    <TouchableOpacity onPress={this.placesSearchHandler}>
                        <View style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>Find Place</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            )
        }

        if (this.state.placesLoaded) {
            content=(
                <Animated.View
                    style={{
                        opacity: this.state.placesAnimation,
                        transform: [
                            {
                                scale: this.state.placesAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [2, 1]
                                })
                            }
                        ]
                    }}
                >
                    <PlacesList
                        places={this.props.places}
                        onPlaceSelected={this.itemSelectedHandler}
                    />
                </Animated.View>
                )
        }
        return (
            <View style={[!this.state.placesLoaded ? styles.buttonContainer : null, styles.container]}>
                {content}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.places.places,
        loading: state.loading.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchButton: {
        borderColor: '#33cc33',
        borderWidth: 3,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: '#33cc33',
        fontWeight: 'bold',
        fontSize: 26
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);