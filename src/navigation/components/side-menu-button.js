import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { useNavigation } from '@react-navigation/native';

function SideMenuButton() {
  const navigation = useNavigation();
  return (
    <Icon.Button
      color="#bc9665"
      name="menu"
      size={25}
      iconStyle={{ paddingLeft: 7 }}
      backgroundColor="#fff"
      onPress={() => {
        navigation.openDrawer();
      }}
      ti
    />
  );
}

export default SideMenuButton;
