/* eslint-disable no-undef */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // Reanimated plugin has to be listed last
  plugins: [['module:react-native-dotenv'], ['react-native-reanimated/plugin']],
};
