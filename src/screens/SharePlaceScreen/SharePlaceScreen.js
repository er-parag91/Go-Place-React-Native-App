import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
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

    onPlaceNameChangeHandler = (value) => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        valid: validate(value, prevState.controls.placeName.validationRules),
                        value: value,
                        touched: true
                    }
                }
            }
        })
    }

    placeAddedHandler = (placeName) => {
            this.props.onPlaceAdded(placeName.value);
    }
    
    render(){
        return(
            <ScrollView>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={60} style={styles.container}>
                    <MainText>
                        <HeadingText>Share place with us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput placeName={this.state.controls.placeName} onChangeHandler={this.onPlaceNameChangeHandler} />
                    <Button disabled={!this.state.controls.placeName.valid} title="Share Place" onPress={() => this.placeAddedHandler(this.state.controls.placeName)} />
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        onPlaceAdded: (place) => dispatch(addPlace(place))
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
    }
})
export default connect(null, mapDistpatchToProps)(ShareScreenPlace);