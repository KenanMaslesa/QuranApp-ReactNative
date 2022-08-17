import React from 'react';

import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {Provider} from 'react-redux';

import App from './App';
import {name as appName} from './app.json';
import {store} from './redux/store';

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
TrackPlayer.registerPlaybackService(() => require('./service'));
