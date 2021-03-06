import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';

const StartMainTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share-alt' : "ios-share", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : 'ios-menu', 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-trash" : "ios-trash", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "Go-places.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "SideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "Go-places.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "SideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: '#7ed56f',
                tabBarBackgroundColor: '#333',
                tabBarButtonColor: '#f7f7f7'
            },
            drawer: {
                left: {
                    screen: 'Go-places.SideDrawer'
                }
            },
            // for android tab styling
            appStyle: {
                tabBarSelectedButtonColor: '#33cc33'
            }
        })
    })
}

export default StartMainTabs;