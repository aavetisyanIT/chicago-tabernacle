import React, {FC, useContext, useCallback} from 'react';
import VideoPlayer from 'react-native-video-controls';

import {AppContext} from '../../context/app.context';
import {actionTypes} from '../../context/action.types';

export const Player: FC = () => {
  const [state, dispatch] = useContext(AppContext);
  const {isVideoPaused, articleVideoUrl, articleImageUrl, isFullScreenVideo} =
    state;

  const handleOnPlay = useCallback(() => {
    dispatch({
      type: actionTypes.SET_PAUSE_VIDEO,
      payload: false,
    });
  }, [dispatch]);

  const handleOnEnd = useCallback(() => {
    dispatch({
      type: actionTypes.SET_PAUSE_VIDEO,
      payload: true,
    });
  }, [dispatch]);

  const handleOnEnterFullscreen = useCallback(() => {
    dispatch({
      type: actionTypes.SET_FULLSCREEN_VIDEO,
      payload: true,
    });
  }, [dispatch]);

  const handleOnExitFullscreen = useCallback(() => {
    dispatch({
      type: actionTypes.SET_FULLSCREEN_VIDEO,
      payload: false,
    });
  }, [dispatch]);

  React.useEffect(() => {
    return () => {
      dispatch({
        type: actionTypes.SET_PAUSE_VIDEO,
        payload: true,
      });
    };
  }, [dispatch]);

  return (
    <VideoPlayer
      paused={isVideoPaused}
      fullscreen={isFullScreenVideo}
      videoStyle={{
        flex: 1,
      }}
      toggleResizeModeOnFullscreen
      onPlay={handleOnPlay}
      onEnd={handleOnEnd}
      // onError={() => console.log('error')}
      onEnterFullscreen={handleOnEnterFullscreen}
      onExitFullscreen={handleOnExitFullscreen}
      tapAnywhereToPause
      controlAnimationTiming={1000}
      controlTimeout={25000}
      scrubbing={10}
      audioOnly={isVideoPaused}
      //TODO provide correct source when player is ready
      source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
      // source={{
      //   uri:
      //     articleVideoUrl ||
      //     'https://player.vimeo.com/external/535955445.m3u8?s=9b15c3f1d9565e47615953db6c46c27b79c686fb',
      // }}
      posterResizeMode="cover"
      poster={
        articleImageUrl ||
        'https://chitab.org/wp-content/uploads/2020/09/CT-blank-slide.png'
      }
      disableBack
    />
  );
};
