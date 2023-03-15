import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import database from '@react-native-firebase/database';

import { AppContext } from '../../../context/app.context';

const SermonListHeader = ({ sermonUrl, sermonId, navigation }) => {
  const [isLatestSermonViewed, setIsLatestSermonViewed] =
    useState(false);
  const [{ userUid }] = useContext(AppContext);

  //listens for screen focus time to update new icon
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        const userArticlesRef = database().ref(
          `/users/${userUid}/articles`,
        );
        userArticlesRef
          .child(sermonId)
          .once('value')
          .then((data) => {
            if (data.val()) {
              const isArticleViewed = data.val().read;
              if (isArticleViewed === true) {
                return setIsLatestSermonViewed(true);
              }
            }
          });
      } catch (error) {
        console.log('SermonListHeader useEffect');
        console.log('Error: ', error.message);
      }
    });

    return unsubscribe;
  }, [navigation, sermonId, userUid]);

  return (
    <>
      <FastImage
        source={{
          uri: `${sermonUrl}`,
          priority: FastImage.priority.normal,
        }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
      />
      {!isLatestSermonViewed ? <View style={styles.circle} /> : null}
    </>
  );
};

export default SermonListHeader;

const styles = StyleSheet.create({
  image: { flex: 1 },
  circle: {
    height: 25,
    width: 25,
    borderRadius: 50,
    position: 'absolute',
    top: 200,
    left: 10,
    elevation: 10,
    backgroundColor: '#bc9665',
  },
});
