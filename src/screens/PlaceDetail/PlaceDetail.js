import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { deletePlace} from '../../store/action/index';

class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'portrait'
        }
        Dimensions.addEventListener('change', this.updateStyle);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = (event) => {
        if (event.id === 'deleteButton') {
            this.props.onPlaceDelete(this.props.selectedPlace.key);
            this.props.navigator.pop();
        }
    }

    componentWillUnmount(){
        Dimensions.removeEventListener('change', this.updateStyle)
    }

    updateStyle = (event) => {
        this.setState({
            viewMode: event.window.height > 500 ? 'portrait' : 'landscape'
        })
    }

    render() {
        return (
            <View style={[styles.container, this.state.viewMode === 'portrait' ? styles.portraitContainer : styles.landscapeContainer]}>
                <View style={styles.subContainer}>
                    <Image resizeMode="cover" source={this.props.selectedPlace.placeImage} style={styles.placeImage} />
                </View>

                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.description}>{this.props.selectedPlace.placeDescription}</Text>
                        <Text style={styles.description}>{this.props.selectedPlace.placeDescription}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: 'column'
    },
    landscapeContainer: {
        flexDirection: 'row'
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    description: {
        textAlign: 'left',
        fontWeight: '200',
    },
    placeImage: {
        height: '100%',
        width: '100%'
    },
    deleteButton: {
        alignItems: 'center'
    }
})

const mapDispatchToProps = (dispatch) => {
    return {
        onPlaceDelete: (placeKey) => dispatch(deletePlace(placeKey))
    }
}
export default connect(null, mapDispatchToProps)(PlaceDetail);