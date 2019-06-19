import React, { Component } from 'react';
import { Button, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/action/index';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import validate from '../../utility/validation';
class ShareScreenPlace extends Component {
    static navigatorStyle = {
        navBarButtonColor: '#33cc33',
        navBarBackgroundColor: '#4d4d4d'
    }
    constructor(props) {
        super(props);
        this.state = {
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
                }
            }
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

    locationPickedHandler = (location) =>{
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
            this.props.onPlaceAdded(controls.placeName.value, controls.placeDescription.value, controls.location.value);
            this.setState({ controls: {
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
                }
            }})
    }
    
    render(){
        return(
            <ScrollView>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30} style={styles.container}>
                    <MainText>
                        <HeadingText>Share place with us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation onLocationPick={this.locationPickedHandler} />
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
                    <Button
                    disabled={
                        !this.state.controls.placeName.valid ||
                        !this.state.controls.location.valid
                        } 
                    title="Share Place" 
                    onPress={this.placeAddedHandler} 
                    />
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        onPlaceAdded: (placeName, placeDescription, location) => dispatch(addPlace(placeName, placeDescription, location))
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
        height:120,
        textAlign: 'left',
        width: '100%',
        borderTopWidth: 1,
        borderBottomWidth : 1,
        borderColor: '#eee',
        padding: 10,
        marginTop: 10,
        marginBottom: 10
    }
})
export default connect(null, mapDistpatchToProps)(ShareScreenPlace);