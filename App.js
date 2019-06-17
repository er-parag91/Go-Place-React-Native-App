import { Navigation } from 'react-native-navigation';
import Auth from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlaceScreen/FindPlaceScreen';
import ShareScreenPlace from './src/screens/ShareScreenPlace/ShareScreenPlace';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import PlaceDetail from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';

const store = configureStore();

Navigation.registerComponent("Go-places.AuthScreen", () => Auth, store, Provider);
Navigation.registerComponent("Go-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("Go-places.ShareScreenPlace", () => ShareScreenPlace, store, Provider);
Navigation.registerComponent("Go-places.PlaceDetail", () => PlaceDetail, store, Provider);
Navigation.registerComponent("Go-places.SideDrawer", () => SideDrawer)

Navigation.startSingleScreenApp({
  screen: {
    screen: "Go-places.AuthScreen",
    title: "Login"
  }
});