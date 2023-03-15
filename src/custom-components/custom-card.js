import React from 'react';
import { StyleSheet, View } from 'react-native';

function CustomCard({ children }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
}

export default CustomCard;

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
    marginHorizontal: 12,
    borderRadius: 5,
    elevation: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardContent: {
    backgroundColor: '#fff',
  },
});
