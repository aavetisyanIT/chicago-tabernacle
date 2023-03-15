import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { Text, View, StyleSheet } from 'react-native';
import database from '@react-native-firebase/database';
import { useIsFocused } from '@react-navigation/native';

import { AppContext } from './../../../context/app.context';

const SermonCard = ({ sermon, navigation }) => {
  const handlePress = () => {
      navigation.navigate('TopTabsSermonStack', {
        screen: 'SERMON NOTES',
        params: {
          article: sermon.item,
          sermonCardParams: true,
        },
      });
    },
    [{ userUid }] = React.useContext(AppContext),
    [isViewed, setIsViewed] = React.useState(false),
    isFocused = useIsFocused(); // makes component rerender on navigation stack change

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await database()
          .ref(`/users/${userUid}/articles/${sermon.item.id}`)
          .once('value');
        setIsViewed(data.val()?.read);
      } catch (error) {
        console.log('SermonCard isSermonViewed');
        console.log('Error: ', error.message);
      }
    };
    fetchData();
  }, [isFocused, sermon, userUid]);

  return (
    <View style={styles.container}>
      <TouchableRipple
        onPress={handlePress}
        borderless={true}
        centered={true}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View style={styles.content}>
          <Text style={styles.headLine}>
            {sermon.item.headline}
            {'  '}
            {isViewed ? '' : <View style={styles.yellowDot} />}
          </Text>
          <Text style={styles.description}>{sermon.item.desc}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

export default SermonCard;

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  content: { padding: 13 },
  headLine: { fontFamily: 'Roboto-Medium' },
  description: { fontFamily: 'Roboto-Thin' },
  yellowDot: {
    width: 9,
    height: 9,
    borderRadius: 50,
    backgroundColor: '#bc9665',
  },
});
