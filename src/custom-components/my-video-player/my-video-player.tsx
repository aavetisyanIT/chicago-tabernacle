import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';

export function MyVideoPlayer() {
  const videoPlayer = useRef(null);
  return (
    <View style={styles.backgroundVideo}>
      <Video
        source={{
          uri: 'https://player.vimeo.com/progressive_redirect/playback/807635368/rendition/1080p/file.mp4?loc=external&signature=c58786cb94636a52302d9f91d89ac09fca220fa989a618d53f6ee66bebc2f2bc',
        }}
        style={{
          flex: 1,
        }}
        paused={false}
        ref={videoPlayer}
        resizeMode="contain"
        posterResizeMode="cover"
      />
    </View>
  );
}

// Later on in your styles..
const styles = StyleSheet.create({
  backgroundVideo: {flex: 1, height: 250, width: 400},
});
