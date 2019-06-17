import React, { Component } from 'react';
import { View } from 'react-native';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { connect } from 'react-redux';
import { addPlace } from '../../store/action/index';

class ShareScreenPlace extends Component {
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