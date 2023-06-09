import React, {useEffect, useContext, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event,
  State,
} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {AppContext} from '../context/app.context';
import {actionTypes} from '../context/action.types';
import CustomButton from './custom-button';
import {TrackInitialize} from '../utils/';
import {QueueTracksService} from '../utils';
import {timeFormat} from '../utils';

const subscribedEvents = [Event.PlaybackState, Event.RemotePause];

export function CustomTrackPlayer(props) {
  const {
    title,
    url,
    trackPlayerVisible,
    showTrackPlayer,
    hideTrackPlayer,
    trackId,
    image,
  } = props;
  // state to manage whether track player is initialized or not
  // The play button stays disabled if the Track Player isn't initialized.
  const [{isTrackPlaying, isVideoPaused}, dispatch] = useContext(AppContext);
  const [isTrackInitialed, setIsTrackInitialed] = useState(false);
  const [timeStamp, setTimeStamp] = useState('00:00');
  const [trackTime, setTrackTime] = useState('00:00');
  // the value of the slider should be between 0 and 1
  const [sliderValue, setSliderValue] = useState(0);
  // flag to check whether the use is sliding the seekbar or not
  const [isSeeking, setIsSeeking] = useState(false);
  // useProgress is a hook which provides the current position
  // and duration of the track player. These values will update every 250ms
  const {position, duration} = useProgress(250);

  // initialize TrackPlayer on page mount
  useEffect(() => {
    let unmounted = false;
    (async () => {
      await TrackInitialize();
      setIsTrackInitialed(true);
      if (unmounted) return;
    })();
    return function cleanup() {
      TrackPlayer.reset();
      unmounted = true;
    };
  }, [url, trackId, title, image]);

  // Pause media when video starts playing
  useEffect(() => {
    if (!isVideoPaused && isTrackInitialed) {
      dispatch({
        type: actionTypes.SET_TRACK_PLAYING,
        payload: false,
      });
      (async () => {
        await TrackPlayer.pause();
      })();
    }
  }, [isVideoPaused, dispatch, isTrackInitialed]);

  //set and play track
  useEffect(() => {
    if (trackPlayerVisible) {
      (async () => {
        await QueueTracksService(url, trackId, title, image);
        await TrackPlayer.play();
        dispatch({
          type: actionTypes.SET_PAUSE_VIDEO,
          payload: true,
        });
        dispatch({
          type: actionTypes.SET_OVERLAY_VIEW,
          payload: true,
        });
      })();
    }
  }, [trackPlayerVisible, dispatch, url, trackId, title, image]);

  // this hook updates the value of the slider whenever
  // the current position of the song changes
  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
    setTimeStamp(timeFormat(position));
    setTrackTime(timeFormat(duration));
  }, [position, duration, isSeeking]);

  //The subscription is removed when the component unmounts
  useTrackPlayerEvents(subscribedEvents, event => {
    if (event.state === State.Playing) {
      dispatch({
        type: actionTypes.SET_TRACK_PLAYING,
        payload: true,
      });
    } else if (event.state === State.None) {
      hideTrackPlayer();
      setTimeStamp('00:00');
      setSliderValue(0);
    } else if (event.state === State.Paused) {
      dispatch({
        type: actionTypes.SET_TRACK_PLAYING,
        payload: false,
      });
    }
  });

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

  // this function is called when the user stops sliding the seekbar
  const slidingCompleted = async value => {
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
        onSlidingStart={() => setIsSeeking(true)}
        onSlidingComplete={slidingCompleted}
      />
      <Text style={styles.text}>{trackTime}</Text>
      <TouchableOpacity
        style={styles.playPauseButton}
        onPress={onPlayButtonPressed}>
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
  slider: {width: '55%', backgroundColor: '#bc9665'},
  playPauseButton: {marginLeft: 0},
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
