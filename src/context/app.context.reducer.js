import { actionTypes } from './action.types';

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.payload };
    case actionTypes.SET_INITIALIZING_AUTH:
      return { ...state, initializingAuth: action.payload };
    case actionTypes.SET_FULLSCREEN_VIDEO:
      return { ...state, isFullScreenVideo: action.payload };
    case actionTypes.TOGGLE_FULLSCREEN_VIDEO:
      return {
        ...state,
        isFullScreenVideo: !state.isFullScreenVideo,
      };
    case actionTypes.TOGGLE_PAUSE_VIDEO:
      return {
        ...state,
        isVideoPaused: !state.isVideoPaused,
      };
    case actionTypes.SET_PAUSE_VIDEO:
      return { ...state, isVideoPaused: action.payload };
    case actionTypes.TOGGLE_OVERLAY_VIEW:
      return { ...state, isOverlayView: !state.isOverlayView };
    case actionTypes.SET_OVERLAY_VIEW:
      return { ...state, isOverlayView: action.payload };
    case actionTypes.SET_SCREEN_DIMENSIONS:
      return {
        ...state,
        screenDimensions: {
          window: action.payload.window,
          screen: action.payload.screen,
        },
      };
    case actionTypes.SET_ARTICLE_VIDEO_URL:
      return {
        ...state,
        articleVideoUrl: action.payload,
      };
    case actionTypes.SET_ARTICLE_IMAGE_URL:
      return {
        ...state,
        articleImageUrl: action.payload,
      };
    case actionTypes.SET_DISMISS_TIMER_ID:
      return {
        ...state,
        dismissTimerId: action.payload,
      };
    case actionTypes.SET_TRACK_PLAYING:
      return {
        ...state,
        isTrackPlaying: action.payload,
      };
    case actionTypes.SET_CURRENT_DEVOTIONAL_ID:
      return { ...state, currentDevotionalId: action.payload };
    case actionTypes.SET_CURRENT_DEVOTIONAL_PARAG_ID:
      return { ...state, currentDevotionalParagId: action.payload };
    case actionTypes.SET_CURRENT_SERMON_ID:
      return { ...state, currentSermonId: action.payload };
    case actionTypes.SET_CURRENT_SERMON_PARAG_ID:
      return { ...state, currentSermonParagId: action.payload };
    case actionTypes.SET_USER_UID:
      return { ...state, userUid: action.payload };
    default:
      throw new Error();
  }
};

export default reducer;
