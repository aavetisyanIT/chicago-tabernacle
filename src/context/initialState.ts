import {Dimensions, ScaledSize} from 'react-native';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');

export interface IInitialState {
  user: null;
  initializingAuth: boolean;
  isFullScreenVideo: boolean;
  isVideoPaused: boolean;
  isOverlayView: boolean;
  screenDimensions: {
    window: ScaledSize;
    screen: ScaledSize;
  };
  userUid: string;
  articleVideoUrl: string;
  articleImageUrl: string;
  dismissTimerId: number;
  isTrackPlaying: boolean;
  currentDevotionalId: string;
  currentDevotionalParagId: string;
  currentSermonId: string;
  currentSermonParagId: string;
}

const initialState = {
  user: null,
  initializingAuth: true,
  isFullScreenVideo: false,
  isVideoPaused: true,
  isOverlayView: true,
  screenDimensions: {window, screen},
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
