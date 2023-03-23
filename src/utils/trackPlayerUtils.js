import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

// Build timestamp
export const timeFormat = time => {
  const date = new Date(time * 1000);
  let hh = date.getUTCHours();
  let mm = date.getUTCMinutes();
  let ss = date.getSeconds();

  // Ensure there are two-digits
  if (hh < 10) hh = `0${hh}`;
  if (mm < 10) mm = `0${mm}`;
  if (ss < 10) ss = `0${ss}`;

  let timeStamp = '';
  if (hh !== 0) {
    // Format HH:MM:SS
    timeStamp = `${hh}:${mm}:${ss}`;
  }
  // Format MM:SS
  timeStamp = `${mm}:${ss}`;

  return timeStamp;
};

let lastTap = 0;
let timerId = 0;
export const handleDoubleTap = (doubleTapCallback, signleTapCallback) => {
  const now = Date.now();
  const DOUBLE_PRESS_DELAY = 300;
  if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
    clearTimeout(timerId);
    doubleTapCallback();
  } else {
    lastTap = now;
    timerId = setTimeout(() => {
      signleTapCallback();
    }, DOUBLE_PRESS_DELAY);
  }
  return null;
};

// function to initialize the Track Player
export const trackPlayerInit = async (url, trackId, title, image) => {
  try {
    await TrackPlayer.setupPlayer();

    // Controlling The Music From Outside
    TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpBackward,
        Capability.JumpBackward,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
    });
    await TrackPlayer.add({
      id: trackId,
      url,
      type: 'default',
      title,
      artwork: image,
    });
    await TrackPlayer.play();
    return true;
  } catch (error) {
    console.log('trackPlayerInit', error);
  }
};
