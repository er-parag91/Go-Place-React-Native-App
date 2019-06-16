import { Navigation } from 'react-native-navigation';
import Auth from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlaceScreen/FindPlaceScreen';
import ShareScreenPlace from './src/screens/ShareScreenPlace/ShareScreenPlace';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';

const store = configureStore();

Navigation.registerComponent("Go-places.AuthScreen", () => Auth, store, Provider);
Navigation.registerComponent("Go-places.FindPlaceScreen", () => FindPlaceScreen, store, Provider);
Navigation.registerComponent("Go-places.ShareScreenPlace", () => ShareScreenPlace, store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: "Go-places.AuthScreen",
    title: "Login"
  }
});