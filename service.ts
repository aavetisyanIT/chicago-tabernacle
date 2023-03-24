/* eslint-disable no-undef */
import TrackPlayer, {Event} from 'react-native-track-player';

export async function PlaybackService() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());

  TrackPlayer.addEventListener(Event.RemoteJumpForward, async () => {
    let newPosition = await TrackPlayer.getPosition();
    const duration = await TrackPlayer.getDuration();
    newPosition += 10;
    if (newPosition > duration) {
      newPosition = duration;
    }
    TrackPlayer.seekTo(newPosition);
  });

  TrackPlayer.addEventListener(Event.RemoteJumpBackward, async () => {
    let newPosition = await TrackPlayer.getPosition();
    newPosition -= 10;
    if (newPosition < 0) {
      newPosition = 0;
    }
    TrackPlayer.seekTo(newPosition);
  });
}
