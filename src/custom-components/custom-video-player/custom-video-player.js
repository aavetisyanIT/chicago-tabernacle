import React from 'react';

import PlayerSlider from './player-slider';
import PlayerFullscreenProvider from './player-fullscreen-provider';
import PlayerLayersProvider from './player-layers-provider';
import {VideoPlayerContextProvider} from './video-player-context';

export function CustomVideoPlayer() {
  return (
    <PlayerFullscreenProvider>
      <VideoPlayerContextProvider>
        <PlayerLayersProvider>
          <PlayerSlider />
        </PlayerLayersProvider>
      </VideoPlayerContextProvider>
    </PlayerFullscreenProvider>
  );
}
