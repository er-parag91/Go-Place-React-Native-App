import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Platform, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import PlacesList from '../../components/PlacesList/PlacesList';
import Icon from 'react-native-vector-icons/Ionicons';
import { getPlaces } from '../../store/action/places';
import Spinner from 'react-native-loading-spinner-overlay';
import backgroundImage from '../../Assets/login.jpg';

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarBackgroundColor: '#212121',
        navBarTextColor: '#7ed56f'
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
        if (event.type === 'ScreenChangedEvent') {
            if (event.id === 'willAppear') {
                this.props.onLoadPlaces()
            }
        }
        
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'SideDrawerToggle') {
                this.props.navigator.toggleDrawer({
                    side: 'left'
                })
            }
        }
    }

    redirectEventHandler = () => {
        this.props.navigator.switchToTab({ tabIndex: 1 });
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
            Icon.getImageSource(Platform.OS === 'android' ? "md-trash" : "ios-trash", 40, 'red')
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
        let content = (
            <Spinner
                visible={true}
                textContent={'Alomst there...'}
                textStyle={styles.spinnerTextStyle}
                overlayColor="#00000077"
            />
        )
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
                        width: '95%',
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
                        redirectButtonPressed={this.redirectEventHandler}
                    />
                </Animated.View>
                )
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={[!this.state.placesLoaded ? styles.buttonContainer : null, styles.container]}>
                    {content}
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        places: state.places.places,
        loading: state.loading.isLoading,
        token: state.auth.token
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPlaces: () => dispatch(getPlaces())
    }
}
const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        flex: 1
    },
    container: {
        backgroundColor: '#f7f7f7',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

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
    },
    spinnerTextStyle: {
        color: '#ddd'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(FindPlaceScreen);