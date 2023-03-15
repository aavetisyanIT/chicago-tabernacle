import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Divider,
  Text,
  TextInput,
  Button,
  Checkbox,
} from 'react-native-paper';

import PrayerScreenText from './components/prayer-screen-text';

export default function PrayerRequestScreen() {
  // local state used only in this component
  const [checked, setChecked] = React.useState(true);
  const [inputOnFocus, setInputOnFocus] = React.useState(false);

  // temporary state that needs to move to Redux
  const [text, setText] = React.useState('');

  const handleOnBlur = () => {
    if (text) return;
    setInputOnFocus(false);
  };

  const handleOnFocus = () => {
    setInputOnFocus(true);
  };

  const handleOnChangeText = (text) => {
    setText(text);
  };

  const handleCheckBoxOnPress = () => {
    setChecked(!checked);
  };

  const handleSubmit = () => {
    setText('');
  };
  return (
    <View style={styles.container}>
      <Divider />
      <PrayerScreenText />
      <Divider />
      <TextInput
        label="Prayer"
        value={text}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChangeText={handleOnChangeText}
        style={styles.textInput}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          color="#bc9665"
          onPress={handleCheckBoxOnPress}
        />
        <Text style={styles.checkboxLabelText}>
          Please make anonymous
        </Text>
      </View>
      <Divider />
      <Button
        style={styles.button}
        labelStyle={{ color: 'white' }}
        mode="contained"
        disabled={!inputOnFocus}
        onPress={handleSubmit}
      >
        Submit
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  textInput: { backgroundColor: '#fff' },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 15,
  },
  checkboxLabelText: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Light',
  },
  button: { margin: 20 },
});
