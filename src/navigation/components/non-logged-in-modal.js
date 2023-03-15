import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../../custom-components/custom-button';

import * as RootNavigation from '../RootNavigation';

// Currently not used
// Whole component

function NonLoggedInModal() {
  const [modalVisible, setModalVisible] = React.useState(true);

  function handleOnPress() {
    setModalVisible(false);
    RootNavigation.navigate("WHAT'S NEW");
  }

  return (
    <Modal isVisible={modalVisible}>
      <View style={styles.modal}>
        <Text style={styles.warningText}>You are not Logged in</Text>
        <CustomButton
          onPress={handleOnPress}
          title="OK"
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
    </Modal>
  );
}

export default NonLoggedInModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
    opacity: 1,
    padding: 20,
    borderRadius: 2,
  },
  button: {
    display: 'flex',
    width: '90%',
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: '#bc9665',
    margin: 15,
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#fff',
  },
  warningText: { margin: 10, fontSize: 16 },
});
