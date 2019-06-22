import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { authLogOut } from '../../store/action';

const SideDrawer = (props) => (
    <View style={[styles.container, { width: Dimensions.get("window").width * 0.8 }]}>
        <TouchableOpacity onPress={props.onLogout}>
            <View style={styles.logOut}>
                <Icon 
                    name={Platform.OS === "android" ? "md-log-out"  : "ios-log-out"}
                    size={30}
                    color="#999"
                    />
                <Text style={{ marginLeft: 10 }}>Logout</Text>
            </View>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: 'white',
        flex: 1
    },
    logOut: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eee'
    }

});

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogOut())
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer);