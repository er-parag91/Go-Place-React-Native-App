import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { addPlace } from '../../store/action/index';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
class ShareScreenPlace extends Component {
    state={
        placeName: ''
    }
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

    onPlaceNameChangeHandler = (event) => {
        this.setState({ placeName: event })
    }

    placeAddedHandler = (placeName) => {
        this.props.onPlaceAdded(placeName);
    }
    
    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share place with us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput placeName={this.state.placeName} onChangeHandler={this.onPlaceNameChangeHandler} />
                    <Button title="Share Place" onPress={() => this.placeAddedHandler(this.state.placeName)} />
                </View>
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