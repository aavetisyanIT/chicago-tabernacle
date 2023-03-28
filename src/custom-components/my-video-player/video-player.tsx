import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {default as Player} from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';
import {AppContext} from '../../context/app.context';

export function VideoPlayer() {
  const [state] = useContext(AppContext);
  const {screenDimensions, isFullScreenVideo, dismissTimerId} = state;
  const screenHeight = screenDimensions.screen.height;
  const screenWidth = screenDimensions.screen.width;

  console.log('====================================');
  console.log('screenHeight', screenHeight);
  console.log('screenWidth', screenWidth);
  console.log('====================================');

  const [isVideoPaused, setIsVideoPaused] = useState<boolean>(true);
  const [isPosterShown, setIsPosterShown] = useState<boolean>(true);
  return (
    <View style={styles.backgroundVideo}>
      <Player
        paused={isVideoPaused}
        onPlay={() => setIsPosterShown(false)}
        onEnterFullscreen={() => Orientation.lockToLandscape()}
        onExitFullscreen={() => Orientation.lockToPortrait()}
        audioOnly={isPosterShown}
        disableBack
        tapAnywhereToPause={false}
        source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
        posterResizeMode="cover"
        poster="https://chitab.org/wp-content/uploads/2023/03/03122023-LLG-APP-COVERS-01.png"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {flex: 1, height: 250, width: 400},
});
