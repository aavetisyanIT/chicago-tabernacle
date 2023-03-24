import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from 'react-native-track-player';

// function to initialize the Track Player
export const TrackInitialize = async () => {
  let isSetup = false;
  try {
    // this method will only reject if player has not been setup yet
    await TrackPlayer.getCurrentTrack();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.JumpBackward,
        Capability.JumpBackward,
        Capability.Stop,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      progressUpdateEventInterval: 2,
    });
    //await TrackPlayer.setRepeatMode(RepeatMode.Queue);
    isSetup = true;
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return isSetup;
  }
};
