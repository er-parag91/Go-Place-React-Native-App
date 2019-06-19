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
                    <View>
                        <Text style={styles.title}>Place Information</Text>
                        <Text style={styles.description}>{placeinfo}</Text>
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
        justifyContent: 'center',
        paddingRight: 8
    },
    description: {
        textAlign: 'left',
        fontWeight: '200',
    },
    title: {
        textAlign: 'left',
        fontWeight: "500",
        marginBottom: 15
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