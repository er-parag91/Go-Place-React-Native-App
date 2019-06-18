import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace} from '../../store/action/index';

class PlaceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewMode: 'portrait'
        }
        Dimensions.addEventListener('change', this.updateStyle)
    }
    placeDeleteHandler = () => {
        this.props.onPlaceDelete(this.props.selectedPlace.key);
        this.props.navigator.pop();
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
                        <Text style={styles.title}>{this.props.selectedPlace.place}</Text>
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.placeDeleteHandler}>
                            <View style={styles.deleteButton}>
                                <Icon
                                    size={30}
                                    name={Platform.OS === 'android' ? "md-trash" : "ios-trash"}
                                    color="red"
                                />
                            </View>
                        </TouchableOpacity>
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
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28
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