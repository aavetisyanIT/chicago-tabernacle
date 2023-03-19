import {videoPlayerActionTypes} from './video.player.action.types';

const videoPlayerReducer = (state, action) => {
  switch (action.type) {
    case videoPlayerActionTypes.SET_CURRENT_VIDEO_PLAY_TIME:
      return {
        ...state,
        currentVideoPlayTime: action.payload,
      };
    case videoPlayerActionTypes.SET_VIDEO_DURATION:
      return {
        ...state,
        videoDuration: action.payload,
      };
    case videoPlayerActionTypes.SET_VIDEO_PLAYER_OBJECT:
      return {
        ...state,
        videoPlayer: action.payload,
      };
    default:
      throw new Error();
  }
};

export default videoPlayerReducer;
