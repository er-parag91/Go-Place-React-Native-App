import { Navigation } from 'react-native-navigation';


const StartMainTabs = () => {
    Navigation.startTabBasedApp({
        tabs: [
            {
                screen: "Go-places.FindPlaceScreen",
                label: "Find Place",
                title: "Find Place"
            },
            {
                screen: "Go-places.ShareScreenPlace",
                label: "Share Place",
                title: "Share Place"
            }
        ]
    })
}

export default StartMainTabs;