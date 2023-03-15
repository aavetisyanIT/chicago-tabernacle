import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

// Placeholder component for the tabs
// It will be rendered when a tab isn't loaded yet
function LazyPlaceholder({ route }) {
  return (
    <View style={styles.scene}>
      <Text>Loading {route.title}…</Text>
    </View>
  );
}

export default LazyPlaceholder;

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
