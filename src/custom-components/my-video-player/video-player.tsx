import React from 'react';
import {StyleSheet, View} from 'react-native';
import {default as Player} from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';

export function VideoPlayer() {
  return (
    <View style={styles.backgroundVideo}>
      <Player
        onEnterFullscreen={() => Orientation.lockToLandscape()}
        onExitFullscreen={() => Orientation.lockToPortrait()}
        paused
        audioOnly={true}
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
