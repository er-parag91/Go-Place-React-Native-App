import React, { Component } from 'react';
import { Button, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, View } from 'react-native';
import { connect } from 'react-redux';
import { addPlace, startAddPlace } from '../../store/action/index';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';
import Spinner from 'react-native-loading-spinner-overlay';

class ShareScreenPlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#33cc33',
        navBarBackgroundColor: '#4d4d4d'
    }
    constructor(props) {
        super(props);
        this.state = {}
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    componentDidUpdate(){
        if(this.props.placeAdded) {
            this.props.navigator.switchToTab({ tabIndex: 0 });
        }
    }

    onNavigatorEvent = (event) => {
        if (event.type === 'ScreenChangedEvent') {
            if (event.id === 'willAppear') {
                this.props.onStartAddPlace()
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

    componentWillMount(){
        this.reset()
    }

    reset = () => {
        this.setState({
            controls: {
                placeName: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                placeDescription: {
                    value: '',
                    valid: false,
                    touched: false,
                    validationRules: {
                        notEmpty: true
                    }
                },
                location: {
                    value: null,
                    valid: false
                },
                placeImage: {
                    value: null,
                    valid: false
                }
            }
        })
    }
    onPlaceNameChangeHandler = (key, value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value, prevState.controls[key].validationRules),
                        touched: true
                    },
                }
            }
        })
    }

    imgageSelectedHandler = (placeImage) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeImage: {
                        ...prevState.controls.placeImage,
                        value: placeImage,
                        valid: true
                    }
                }
            }
        })
    }

    locationPickedHandler = (location) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        ...prevState.controls.location,
                        value: location,
                        valid: true
                    }
                }
            }
        })
    }

    placeAddedHandler = () => {
        const { controls } = this.state;
        this.props.onPlaceAdded(controls.placeName.value, controls.placeDescription.value, controls.location.value, controls.placeImage.value, this.props.localId);
        this.reset();
        this.imagePickerReset.reset();
        this.locationReset.reset();
    }

    render() {
        return (
            <ScrollView>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.container}>
                    <MainText>
                        <HeadingText>Share place with us!</HeadingText>
                    </MainText>
                    <PickImage 
                        onImagePicked={this.imgageSelectedHandler} 
                        ref = {ref => this.imagePickerReset = ref}
                        />
                    <PickLocation 
                        onLocationPick={this.locationPickedHandler}
                        ref = {ref =>this.locationReset = ref}
                        />
                    <PlaceInput
                        placeholder="Place Name"
                        placeName={this.state.controls.placeName}
                        onChangeHandler={(value) => this.onPlaceNameChangeHandler('placeName', value)}
                    />
                    <TextInput
                        placeholder="Description (optional)"
                        value={this.state.controls.placeDescription.value}
                        onChangeText={(value) => this.onPlaceNameChangeHandler('placeDescription', value)}
                        multiline={true}
                        numberOfLines={5}
                        style={styles.textArea}
                    />
                    <View style={styles.button}>
                    <Button
                        disabled={
                            !this.state.controls.placeName.valid ||
                            !this.state.controls.location.valid ||
                            !this.state.controls.placeImage.valid
                        }
                        title="Share Place"
                        onPress={this.placeAddedHandler}
                    />
                    </View>
                    <Spinner
                        visible={this.props.isLoading}
                        textContent={'Processing...'}
                        textStyle={styles.spinnerTextStyle}
                        overlayColor="#00000077"
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loading.isLoading,
        localId: state.auth.localId,
        placeAdded: state.places.placeAdded
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        onPlaceAdded: (placeName, placeDescription, location, placeImage, localId) => dispatch(addPlace(placeName, placeDescription, location, placeImage, localId)),
        onStartAddPlace: () => dispatch(startAddPlace())
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholder: {
        borderWidth: 1,
        borderColor: '#eee',
        backgroundColor: '#ddd',
        width: '80%',
        height: 200
    },
    button: {
        margin: 8
    },
    imagePlaceHolder: {
        width: '100%',
        height: '100%'
    },
    textArea: {
        height: 120,
        textAlign: 'left',
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    },
    spinnerTextStyle: {
        color: '#ddd'
      },
})
export default connect(mapStateToProps, mapDistpatchToProps)(ShareScreenPlace);