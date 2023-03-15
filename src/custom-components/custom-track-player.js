import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  TrackPlayerEvents,
  STATE_PLAYING,
  STATE_NONE,
  STATE_PAUSED,
} from 'react-native-track-player';
import {
  useTrackPlayerProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player/lib/hooks';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { AppContext } from '../context/app.context';
import { actionTypes } from '../context/action.types';
import CustomButton from './custom-button';
import {
  timeFormat,
  trackPlayerInit,
} from '../utils/trackPlayerUtils';

function CustomTrackPlayer({
  title,
  url,
  trackPlayerVisible,
  showTrackPlayer,
  hideTrackPlayer,
  trackId,
  image,
}) {
  // state to manage whether track player is initialized or not
  // The play button stays disabled if the Track Player isn't initialized.
  const [state, dispatch] = React.useContext(AppContext);
  const { isTrackPlaying, isVideoPaused } = state;
  const [isTrackPlayerInit, setIsTrackPlayerInit] =
    React.useState(false);
  const [timeStamp, setTimeStamp] = React.useState('00:00');
  const [trackTime, setTrackTime] = React.useState('00:00');
  // the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = React.useState(0);
  // flag to check whether the use is sliding the seekbar or not
  const [isSeeking, setIsSeeking] = React.useState(false);
  // useTrackPlayerProgress is a hook which provides the current position
  // and duration of the track player. These values will update every 250ms
  const { position, duration } = useTrackPlayerProgress(250);

  // Pause media when video starts playing
  React.useEffect(() => {
    if (!isVideoPaused && isTrackPlayerInit) {
      dispatch({
        type: actionTypes.SET_TRACK_PLAYING,
        payload: false,
      });
      TrackPlayer.pause();
    }
  }, [isVideoPaused, dispatch, isTrackPlayerInit]);

  // initialize the TrackPlayer when "AUDIO PLAYER" is clicked
  React.useEffect(() => {
    // function to initialize the Track Player and pause video player
    const startPlayer = async () => {
      try {
        dispatch({
          type: actionTypes.SET_PAUSE_VIDEO,
          payload: true,
        });
        dispatch({
          type: actionTypes.SET_OVERLAY_VIEW,
          payload: true,
        });
        const isInit = await trackPlayerInit(
          url,
          trackId,
          title,
          image,
        );
        setIsTrackPlayerInit(isInit);
        await TrackPlayer.play();
      } catch (error) {
        console.log(error.message);
      }
    };
    if (trackPlayerVisible) startPlayer();
  }, [trackPlayerVisible, dispatch, image, title, trackId, url]);

  // this hook updates the value of the slider whenever
  // the current position of the song changes
  React.useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
    setTimeStamp(timeFormat(position));
    setTrackTime(timeFormat(duration));
  }, [position, duration, isSeeking]);

  // Unmount track player when leaving a sceen
  React.useEffect(
    () => () => {
      TrackPlayer.destroy();
    },
    [],
  );

  useTrackPlayerEvents(
    [TrackPlayerEvents.PLAYBACK_STATE],
    (event) => {
      if (event.state === STATE_PLAYING) {
        dispatch({
          type: actionTypes.SET_TRACK_PLAYING,
          payload: true,
        });
      } else if (event.state === STATE_NONE) {
        hideTrackPlayer();
        setTimeStamp('00:00');
        setSliderValue(0);
      } else if (event.state === STATE_PAUSED) {
        dispatch({
          type: actionTypes.SET_TRACK_PLAYING,
          payload: false,
        });
      }
    },
  );

  // start playing the TrackPlayer when the play button is pressed and stop video player
  const onPlayButtonPressed = async () => {
    if (!isTrackPlaying) {
      try {
        dispatch({
          type: actionTypes.SET_TRACK_PLAYING,
          payload: true,
        });
        dispatch({
          type: actionTypes.SET_PAUSE_VIDEO,
          payload: true,
        });
        dispatch({
          type: actionTypes.SET_OVERLAY_VIEW,
          payload: true,
        });
        // sets position of player if slided is used before play pressed first time. Next 3 lines
        const trackDuration = await TrackPlayer.getDuration();
        await TrackPlayer.seekTo(sliderValue * trackDuration);
        setTimeStamp(timeFormat(sliderValue * trackDuration));
        await TrackPlayer.play();
      } catch (error) {
        console.log(error.message);
      }
    } else {
      TrackPlayer.pause();
      dispatch({
        type: actionTypes.SET_TRACK_PLAYING,
        payload: false,
      });
    }
  };

  // this function is called when the user starts to slide the seekbar
  const slidingStarted = () => {
    setIsSeeking(true);
  };

  // this function is called when the user stops sliding the seekbar
  const slidingCompleted = async (value) => {
    try {
      await TrackPlayer.seekTo(value * duration);
      setSliderValue(value);
      setTimeStamp(timeFormat(value * duration));
      setIsSeeking(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const playIcon = <Icon name="play-arrow" size={40} color="#fff" />;
  const pauseIcon = <Icon name="pause" size={40} color="#fff" />;

  return trackPlayerVisible ? (
    <View style={styles.container}>
      <Text style={styles.text}>{timeStamp || '00:00'}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        minimumTrackTintColor="black"
        maximumTrackTintColor="white"
        // thumbImage size can't be configured by props
        // it depends on size of the image in thumbImage prop
        thumbImage={require('../assets/track_player_thumb_size_17.png')}
        onSlidingStart={slidingStarted}
        onSlidingComplete={slidingCompleted}
      />
      <Text style={styles.text}>{trackTime}</Text>
      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={onPlayButtonPressed}
      >
        {isTrackPlaying ? pauseIcon : playIcon}
      </TouchableOpacity>
    </View>
  ) : (
    <CustomButton
      style={styles.audioButton}
      title="AUDIO PLAYER"
      textStyle={styles.audioButtonText}
      icon="volume-high-outline"
      iconSize={22}
      onPress={showTrackPlayer}
    />
  );
}

export default CustomTrackPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 10,
    backgroundColor: '#bc9665',
    height: 80,
    paddingHorizontal: 5,
  },
  text: {
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
  },
  slider: { width: '55%', backgroundColor: '#bc9665' },
  playPauseButton: { marginLeft: 0 },
  audioButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 12,
  },
  audioButtonText: {
    color: '#bc9665',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    marginHorizontal: 5,
  },
});
