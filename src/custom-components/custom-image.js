import React from 'react';
import { StyleSheet } from 'react-native';
import ImageModal from 'react-native-image-modal';

function CustomImage({ url }) {
  return (
    <ImageModal
      swipeToDismiss={false}
      resizeMode="contain"
      imageBackgroundColor="#000000"
      style={styles.image}
      source={{
        uri: url,
      }}
    />
  );
}

export default CustomImage;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9,
  },
});
