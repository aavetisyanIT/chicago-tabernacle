import React, {FC, useState, useCallback} from 'react';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation-locker';

export const Player: FC = () => {
  const [isVideoPaused, setIsVideoPaused] = useState<boolean>(true);
  const [isPosterShown, setIsPosterShown] = useState<boolean>(true);

  const handleOnPlay = useCallback(() => {
    setIsVideoPaused(false);
    setIsPosterShown(false);
  }, []);

  return (
    <VideoPlayer
      paused={isVideoPaused}
      onPlay={handleOnPlay}
      onEnterFullscreen={() => Orientation.lockToLandscape()}
      onExitFullscreen={() => Orientation.lockToPortrait()}
      tapAnywhereToPause={false}
      audioOnly={isPosterShown}
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      posterResizeMode="cover"
      poster="https://chitab.org/wp-content/uploads/2023/03/03122023-LLG-APP-COVERS-01.png"
      disableBack
    />
  );
};
