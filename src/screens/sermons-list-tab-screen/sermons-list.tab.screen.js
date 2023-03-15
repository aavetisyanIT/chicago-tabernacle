import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  StyleSheet,
} from 'react-native';

import SermonCard from './components/sermon-card.component';
import { getAllArticles } from '../../utils/api';
import SermonListHeader from './components/sermon-list-header.component';

function SermonsListTab({ navigation }) {
  const [refreshing] = useState(false);

  // empty object(including id) in the initial state is needed for the first render
  // till useEffect runs and fetches the data from API
  const [sermons, setSermons] = useState({
    items: [{ image: { url: '' }, id: '1' }],
  });

  // Fetch all articles
  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await getAllArticles();
      setSermons(fetchedData.data);
    };
    fetchData();
  }, []);

  const renderSermon = useCallback(
    (sermon) => (
      <SermonCard sermon={sermon} navigation={navigation} />
    ),
    [navigation],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{ height: 1.5 }} />
        )}
        ListHeaderComponent={
          <SermonListHeader
            navigation={navigation}
            sermonUrl={sermons.items[0].image.url}
            sermonId={sermons.items[0].id}
          />
        }
        ListHeaderComponentStyle={styles.imageContainer}
        data={sermons.items}
        renderItem={renderSermon}
        keyExtractor={(sermon) => {
          return sermon.id;
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              null;
            }}
            colors={['#bc9665']}
          />
        }
      />
    </View>
  );
}

export default SermonsListTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: { width: '100%', height: 250 },
});
