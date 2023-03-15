import React from 'react';
import { Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function CustomButton({
  title,
  style,
  textStyle,
  onPress,
  icon,
  iconSize,
  setCurrentHTML,
  currentHTML,
}) {
  const handlePress = (currentHTML) => {
    onPress();
    currentHTML ? setCurrentHTML(currentHTML) : null;
  };

  const myIcon = <Icon name={icon} size={iconSize} color="#bc9665" />;
  return (
    <Pressable onPress={() => handlePress(currentHTML)} style={style}>
      {icon ? myIcon : null}
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}

export default CustomButton;
