import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

function ModalTextInput({ placeholder, value, onChangeText, style }) {
  return (
    <TextInput
      mode="flat"
      multiline={true}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style]}
    />
  );
}

export default ModalTextInput;

const styles = StyleSheet.create({
  input: {
    fontSize: 15,
    backgroundColor: '#fff',
  },
});
