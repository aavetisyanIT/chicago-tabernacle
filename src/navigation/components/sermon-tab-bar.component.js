import * as React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TabBar } from 'react-native-tab-view';

function SermonTabBar(props) {
  return (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={{
        backgroundColor: '#bc9665',
        height: 2.5,
      }}
      renderLabel={({ route }) => (
        <Text style={styles.tabBarText}>{route.name}</Text>
      )}
    />
  );
}
export default SermonTabBar;

const styles = StyleSheet.create({
  tabBar: { backgroundColor: '#fff' },
  tabBarText: { color: '#c4c4c4' },
});
