import React from 'react';

import { VideoPlayerContext } from './video.player.context';
import videoPlayerInitialState from './video.player.initialState';
import videoPlayerReducer from './video.player.context.reducer';

export function VideoPlayerContextProvider(props) {
  const [videoPlayerState, dispatchToVideoPlayerContext] =
    React.useReducer(videoPlayerReducer, videoPlayerInitialState);
  return (
    <VideoPlayerContext.Provider
      value={[videoPlayerState, dispatchToVideoPlayerContext]}
    >
      {props.children}
    </VideoPlayerContext.Provider>
  );
}
