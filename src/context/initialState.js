import { Dimensions } from 'react-native';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

const initialState = {
  user: null,
  initializingAuth: true,
  isFullScreenVideo: false,
  isVideoPaused: true,
  isOverlayView: true,
  screenDimensions: { window, screen },
  articleVideoUrl: '',
  articleImageUrl: '',
  dismissTimerId: 0,
  isTrackPlaying: false,
  currentDevotionalId: '',
  currentDevotionalParagId: '',
  currentSermonId: '',
  currentSermonParagId: '',
  userUid: '',
};

export default initialState;
