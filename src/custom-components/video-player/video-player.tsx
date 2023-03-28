import React, {FC} from 'react';
import {Player} from './Player';

import {PlayerFullscreenProvider} from './player-fullscreen-provider';

export const VideoPlayer: FC = () => {
  return (
    <PlayerFullscreenProvider>
      <Player />
    </PlayerFullscreenProvider>
  );
};
