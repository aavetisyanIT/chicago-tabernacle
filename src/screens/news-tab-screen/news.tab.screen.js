import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import { getAllAnnouncements } from '../../utils/api';
import NewsCard from './components/news-card.component';

function NewsTab({ navigation }) {
  const [refreshing] = React.useState(false);
  const [data, setData] = React.useState({ items: {} });

  // Fetching all announcements
  React.useEffect(() => {
    const fetchData = async () => {
      const announcements = await getAllAnnouncements();
      setData(announcements.data);
    };
    fetchData();
  }, []);

  const newsCard = (announcement) => {
    let announcementData = null;
    switch (announcement.item.type) {
      case 'devo':
        announcementData = {
          type: 'devo',
          id: announcement.item.ref.objectId,
        };
        break;
      case 'article':
        announcementData = {
          type: 'article',
          id: announcement.item.ref.objectId,
        };
        break;
      case 'link':
        announcementData = { type: 'link', id: null };
        break;
    }

    return (
      <NewsCard
        announcement={announcement}
        announcementData={announcementData}
        navigation={navigation}
      />
    );
  };

  const renderNewsCard = React.useCallback(newsCard, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        data={data.items}
        renderItem={renderNewsCard}
        keyExtractor={(announcement) => announcement.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              alert('Refreshing. Empty function');
            }}
            colors={['#bc9665']}
          />
        }
      />
    </View>
  );
}

export default NewsTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
