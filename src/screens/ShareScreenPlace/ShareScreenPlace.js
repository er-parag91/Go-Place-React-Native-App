import React, { Component } from 'react';
import { View } from 'react-native';
import PlaceInput from '../../PlaceInput/PlaceInput';
import { connect } from 'react-redux';
import { addPlace } from '../../store/action/index';

class ShareScreenPlace extends Component {

    placeAddedHandler = (placeName) => {
        this.props.onPlaceAdded(placeName);
    }
    
    render(){
        return(
            <View>
                <PlaceInput placeSubmitHandler={this.placeAddedHandler} />
            </View>
        )
    }
}

const mapDistpatchToProps = (dispatch) => {
    return {
        onPlaceAdded: (place) => dispatch(addPlace(place))
    }
}
export default connect(null, mapDistpatchToProps)(ShareScreenPlace);