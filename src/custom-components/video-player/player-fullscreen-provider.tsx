import React, {FC, ReactNode, useContext, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Dimensions,
  ScaledSize,
  Easing,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';

import {AppContext} from '../../context/app.context';
import {actionTypes} from '../../context/action.types';

export const PlayerFullscreenProvider: FC<{children: ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useContext(AppContext);

  const {screenDimensions, isFullScreenVideo, dismissTimerId} = state;
  const screenHeight = screenDimensions.screen.height;
  const screenWidth = screenDimensions.screen.width;
  const width = useRef(new Animated.Value(screenWidth)).current;
  const height = useRef(new Animated.Value(screenHeight)).current;

  // This useEffect needs to be above others so overlay wouldn't
  // be overriden to false
  useEffect(() => {
    const onScreenRotation = ({
      window,
      screen,
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      dispatch({
        type: actionTypes.SET_SCREEN_DIMENSIONS,
        payload: {window, screen},
      });
    };

    const cleanup = Dimensions.addEventListener('change', onScreenRotation);

    //Toggle Screen Modes
    (() => {
      if (isFullScreenVideo) {
        Orientation.lockToLandscape();
        clearTimeout(dismissTimerId);
        dispatch({
          type: actionTypes.SET_OVERLAY_VIEW,
          payload: false,
        });
      } else {
        Orientation.lockToPortrait();
        clearTimeout(dismissTimerId);
        dispatch({
          type: actionTypes.SET_OVERLAY_VIEW,
          payload: false,
        });
      }
    })();

    return () => cleanup.remove();
  }, [isFullScreenVideo, dismissTimerId, dispatch]);

  React.useEffect(() => {
    Animated.timing(width, {
      toValue: screenWidth * 0.57,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    Animated.timing(height, {
      toValue: screenWidth,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [dispatch, height, screenWidth, width]);

  return (
    <Animated.View
      style={
        isFullScreenVideo
          ? {
              flex: 1,
              height: width,
              width: height,
            }
          : {
              flex: 1,
              height: width,
              width: height,
            }
      }>
      <View style={styles.childrenContainer}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
  },
  childrenContainer: {flex: 1},
});
