import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

function HiddenText({ text, hiddenText }) {
  const [isHiddenTextVisible, setIsHiddenTextVisible] =
    useState(false);

  const signStartPosition = text.indexOf('%@');
  const textStart = text.slice(0, signStartPosition);
  const textEnd = text.slice(signStartPosition + 2);

  const showHiddenText = () => setIsHiddenTextVisible(true);
  return (
    <Pressable onPress={showHiddenText}>
      <View style={styles.container}>
        <Text style={styles.text}>
          {isHiddenTextVisible ? (
            <>
              <Text>{textStart}</Text>
              <Text style={styles.hiddenText}>{hiddenText}</Text>
              <Text>{textEnd}</Text>
            </>
          ) : (
            <>
              <Text>{textStart}</Text>
              <View style={styles.textBlocker(hiddenText.length)} />
              <Text>{textEnd}</Text>
            </>
          )}
        </Text>
      </View>
    </Pressable>
  );
}

export default HiddenText;

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', flexWrap: 'wrap' },
  text: { color: 'lightblue', fontSize: 16 },
  hiddenText: { textDecorationLine: 'underline' },
  textBlocker: (length) => ({
    width: length * 8,
    height: 13,
    backgroundColor: 'lightgrey',
  }),
});
