import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

function DevotionalHeader({ headLine, imageUrl }) {
  return (
    <>
      <FastImage
        source={{
          uri: `${imageUrl}`,
          priority: FastImage.priority.normal,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={styles.headLine}>{headLine}</Text>
      <Divider style={styles.divider} />
    </>
  );
}

export default DevotionalHeader;

const styles = StyleSheet.create({
  image: { height: 250, width: '100%' },
  headLine: { margin: 15, fontFamily: 'Roboto-Light', fontSize: 20 },
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
  divider: { marginBottom: 15, height: 3 },
});
