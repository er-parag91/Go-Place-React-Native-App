import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { deletePlace} from '../../store/action/index';

class PlaceDetail extends Component {

    placeDeleteHandler = () => {
        this.props.onPlaceDelete(this.props.selectedPlace.key);
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image resizeMode="cover" source={this.props.selectedPlace.placeImage} style={styles.placeImage} />
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 28
    },
    placeImage: {
        height: 200,
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