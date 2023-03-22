import * as React from 'react';
import {AppRegistry} from 'react-native';
import {name as chicagoTabernacle} from './app.json';
import App from './src/App';
import {Provider as PaperProvider} from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';
import {playbackService} from './service';

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(chicagoTabernacle, () => Main);

//Register audio track player
TrackPlayer.registerPlaybackService(() => playbackService);
