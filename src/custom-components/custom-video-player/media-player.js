import React from 'react';
import Video from 'react-native-video';

import { AppContext } from '../../context/app.context';
import { actionTypes } from '../../context/action.types';
import { VideoPlayerContext } from './video-player-context/video.player.context';
import { videoPlayerActionTypes } from './video-player-context/video.player.action.types';

function MediaPlayer() {
  const [state, dispatch] = React.useContext(AppContext);
  const [, dispatchToVideoPlayer] = React.useContext(
    VideoPlayerContext,
  );
  const {
    isVideoPaused,
    articleVideoUrl,
    articleImageUrl,
    isFullScreenVideo,
  } = state;
  const videoPlayer = React.useRef(null);

  React.useEffect(() => {
    dispatchToVideoPlayer({
      type: videoPlayerActionTypes.SET_VIDEO_PLAYER_OBJECT,
      payload: videoPlayer.current,
    });
  }, [videoPlayer, dispatchToVideoPlayer]);

  const handleOnLoad = ({ duration }) => {
    dispatchToVideoPlayer({
      type: videoPlayerActionTypes.SET_VIDEO_DURATION,
      payload: duration,
    });
  };
  const handleOnProgress = ({ currentTime }) => {
    dispatchToVideoPlayer({
      type: videoPlayerActionTypes.SET_CURRENT_VIDEO_PLAY_TIME,
      payload: currentTime,
    });
  };

  const handleOnEnd = () => {
    dispatch({
      type: actionTypes.SET_PAUSE_VIDEO,
      action: true,
    });
    // videoPlayer object is stored in current property of refUse
    videoPlayer.current.seek(0.1);
    dispatchToVideoPlayer({
      type: videoPlayerActionTypes.SET_CURRENT_VIDEO_PLAY_TIME,
      payload: 0,
    });
    dispatch({
      type: actionTypes.SET_OVERLAY_VIEW,
      action: true,
    });
  };

  return (
    <Video
      fullscreen={isFullScreenVideo}
      paused={isVideoPaused}
      style={{
        flex: 1,
      }}
      source={{
        uri:
          articleVideoUrl ||
          'https://player.vimeo.com/external/535955445.m3u8?s=9b15c3f1d9565e47615953db6c46c27b79c686fb',
      }}
      resizeMode="contain"
      posterResizeMode="cover"
      poster={
        articleImageUrl ||
        'https://chitab.org/wp-content/uploads/2020/09/CT-blank-slide.png'
      }
      progressUpdateInterval={250.0}
      ref={videoPlayer}
      onLoad={handleOnLoad}
      onProgress={handleOnProgress}
      onEnd={handleOnEnd}
    />
  );
}

export default MediaPlayer;
