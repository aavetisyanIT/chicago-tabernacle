import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';

import FastImage from 'react-native-fast-image';
import CustomTrackPlayer from '../../../custom-components/custom-track-player';
import CustomVideoPlayer from './../../../custom-components/custom-video-player/custom-video-player';
import { AppContext } from './../../../context/app.context';
import { actionTypes } from './../../../context/action.types';

const SermonNoteListHeader = ({ article }) => {
  const [audioPlayerVisible, setAudioPlayerVisible] = useState(false);
  const [, dispatch] = useContext(AppContext);

  const showAudioPlayer = () => setAudioPlayerVisible(true);
  const hideAudioPlayer = () => setAudioPlayerVisible(false);

  const audioUrl = article.audio?.url;
  const audioId = article.audio?.id;
  const videoUrl = article.video?.url;
  const sermonTitle = article.headline;
  const sermonImage = article.image.url;

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_ARTICLE_VIDEO_URL,
      payload: videoUrl,
    });
    dispatch({
      type: actionTypes.SET_ARTICLE_IMAGE_URL,
      payload: sermonImage,
    });
  }, [dispatch, sermonImage, videoUrl]);

  let articleHasAudio =
    article.audio?.type === 'audio' && article.audio;

  return (
    <>
      {videoUrl ? (
        <CustomVideoPlayer />
      ) : (
        <FastImage
          source={{
            uri: `${sermonImage}`,
            priority: FastImage.priority.normal,
          }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}

      <View style={styles.headerContent}>
        <Text>{article.headline}</Text>
        <Text style={styles.description}>{article.desc}</Text>
        {articleHasAudio ? (
          <CustomTrackPlayer
            title={sermonTitle}
            trackId={audioId}
            url={audioUrl}
            image={sermonImage}
            trackPlayerVisible={audioPlayerVisible}
            showTrackPlayer={showAudioPlayer}
            hideTrackPlayer={hideAudioPlayer}
          />
        ) : null}
      </View>
      <Divider style={styles.divider} />
    </>
  );
};

export default SermonNoteListHeader;

const styles = StyleSheet.create({
  image: { height: 250, width: '100%' },
  headerContent: { paddingBottom: 0, padding: 13 },
  description: { fontFamily: 'Roboto-Thin' },
  divider: { marginBottom: 15, height: 3 },
});
