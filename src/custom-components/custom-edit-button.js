import React, { memo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const CustomEditButton = ({
  showModal,
  setCurrentSermonHTML,
  paragHTML,
  editText,
  sermonParagId,
  devoParagId,
}) => {
  const handlePress = (currentHTML) => {
    currentHTML ? setCurrentSermonHTML(currentHTML) : null;
    if (sermonParagId && editText) {
      return showModal({
        sermonParagId: sermonParagId,
        sermonEditNote: editText,
        invokedBy: 'EditButton',
      });
    }
    if (devoParagId && editText) {
      return showModal({
        devoParagId: devoParagId,
        devoEditNote: editText,
        invokedBy: 'EditButton',
      });
    }
    showModal({
      sermonParagId: '',
      sermonEditNote: '',
      invokedBy: 'EditButton',
    });
  };

  return (
    <Pressable
      onPress={() => handlePress(paragHTML)}
      style={styles.container}
    >
      <Text style={styles.noteText}>{editText}</Text>
      <View style={styles.button}>
        <Icon name="edit" size={18} color="#bc9665" />
        <Text style={styles.iconText}>Edit Note</Text>
      </View>
    </Pressable>
  );
};

const areEqual = (prevProps, nextProps) => {
  return nextProps.editText === prevProps.editText;
};

export default memo(CustomEditButton, areEqual);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'lightgrey',
    borderRadius: 3,
  },
  noteText: {
    margin: 7,
  },
  iconText: {
    color: '#bc9665',
  },
  button: {
    flexDirection: 'row',
    margin: 5,
  },
});
