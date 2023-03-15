import React from 'react';
import { StyleSheet, Text } from 'react-native';

function PrayerScreenText() {
  return (
    <>
      <Text style={styles.header}>How Can We Pray For You</Text>
      <Text style={styles.pageContent}>
        If you have a prayer request, please submit it to us; we will
        pray for your request for thirty days at our prayer meetings,
        as will the Intercession Ministry. Prayer request cards are
        also available at the church office or at any of our weekly
        services.
      </Text>
    </>
  );
}

export default PrayerScreenText;

const styles = StyleSheet.create({
  header: { margin: 15, fontSize: 25, fontFamily: 'Roboto-Light' },
  pageContent: {
    margin: 15,
    fontSize: 18,
    fontFamily: 'Roboto-Light',
  },
});
