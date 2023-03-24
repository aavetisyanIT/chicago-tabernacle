import TrackPlayer from 'react-native-track-player';

export const QueueTracksService = async (
  url: string,
  trackId: string,
  title: string,
  image: string,
): Promise<void> => {
  await TrackPlayer.add([
    {
      url,
      title,
      artist: '',
      artwork: image,
      id: trackId,
    },
  ]);
};
