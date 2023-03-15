import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import database from '@react-native-firebase/database';

import SermonNote from './components/sermon-note';
import SermonNoteListHeader from './components/sermon-note-list-header';
import CustomAddNoteModal from '../../custom-components/custom-add-note-modal';
import { AppContext } from '../../context/app.context';
import { actionTypes } from '../../context/action.types';

function SermonNotesTab({ route }) {
  const [{ isFullScreenVideo, user, userUid }, dispatch] =
    useContext(AppContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [sermonEditNote, serSermonEditNote] = useState('');
  const [sermonOpenedParagId, setSermonOpenedParagId] = useState('');
  const [invokedBy, setInvokedBy] = useState('');
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [sermonNotes, setSermonNotes] = useState({});
  const [currentSermonHTML, setCurrentSermonHTML] = useState('');

  const flatListRef = useRef();

  const { article } = route.params;
  const PARAGRAPHDATA = article.paragraphs;

  useEffect(() => {
    database()
      .ref(`/users/${userUid}/articles/${article.id}/notes`)
      .once('value')
      .then((val) => {
        if (val.val()) setSermonNotes(val.val());
      });
  }, [article.id, userUid, isDataChanged]);

  const showModal = ({
    sermonParagId,
    sermonEditNote,
    invokedBy,
  }) => {
    setInvokedBy(invokedBy);
    if (sermonParagId && sermonEditNote) {
      setSermonOpenedParagId(sermonParagId);
      serSermonEditNote(sermonEditNote);
    }
    setModalVisible(true);
  };
  const hideModal = () => {
    setIsDataChanged(!isDataChanged);
    setModalVisible(false);
  };

  const renderItem = (props) => {
    let currentNoteText = '';
    if (sermonNotes[props.item.id]) {
      currentNoteText = sermonNotes[props.item.id].text;
    }
    return (
      <SermonNote
        {...props}
        editNote={currentNoteText}
        showModal={showModal}
        setCurrentSermonHTML={setCurrentSermonHTML}
      />
    );
  };

  //set current sermon id state and populate article read field in DB
  useEffect(() => {
    if (user) {
      dispatch({
        type: actionTypes.SET_CURRENT_SERMON_ID,
        payload: article.id,
      });
      try {
        const userArticlesRef = database().ref(
          `/users/${userUid}/articles`,
        );
        userArticlesRef.child(article.id).update({ read: true });
      } catch (error) {
        console.log('SermonNotesTab useEffect');
        console.log('Error: ', error.message);
      }
    }
  }, [article, dispatch, user, userUid]);

  // Fixes issue when fullscreen is clicked on scrolled screen
  useEffect(() => {
    if (isFullScreenVideo) {
      // moves to the top of the screen
      flatListRef.current.scrollToOffset({
        x: 0,
        y: 0,
        animated: true,
      });
    }
  }, [isFullScreenVideo]);

  return (
    <View style={styles.container}>
      <CustomAddNoteModal
        articleType="sermon"
        modalEditText={sermonEditNote}
        sermonOpenedParagId={sermonOpenedParagId}
        invokedBy={invokedBy}
        modalVisible={modalVisible}
        hideModal={hideModal}
        placeholder="Your Note"
        HTML={currentSermonHTML}
      />
      <FlatList
        ListHeaderComponent={
          <SermonNoteListHeader article={article} />
        }
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        ref={flatListRef}
        data={PARAGRAPHDATA}
        renderItem={renderItem}
        scrollEnabled={!isFullScreenVideo}
        keyExtractor={(item) => item.id}
        style={!isFullScreenVideo && styles.flatList}
      />
    </View>
  );
}

export default SermonNotesTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: { marginBottom: 15 },
});
