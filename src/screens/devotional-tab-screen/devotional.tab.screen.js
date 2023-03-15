import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigationState } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import DevotionalHeader from './components/devotional-header';
import DevotionalNote from './components/devotional-note';
import CustomAddNoteModal from '../../custom-components/custom-add-note-modal';
import { AppContext } from '../../context/app.context';
import { actionTypes } from '../../context/action.types';

function DevotionalTab() {
  const [{ user, userUid }, dispatch] = useContext(AppContext);

  // making use of useNavigation hook to retrive current acticle
  // It wasn't possible to pass it down as a prop(route.params)
  const routes = useNavigationState((state) => state.routes);

  const { article } = routes[0].params;
  const { devoContent } = article;
  const PARAGRAPHSDATA = devoContent[0]?.paragraphs || [];
  const devoId = devoContent[0]?.id || '';

  const [modalVisible, setModalVisible] = useState(false);
  const [currentParagraphHTML, setCurrentParagraphHTML] =
    useState('');
  const [devoNotes, setdevoNotes] = useState({});
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [invokedBy, setInvokedBy] = useState('');
  const [devoOpenedParagId, setdevoOpenedParagId] = useState('');
  const [devoEditNote, setdevoEditNote] = useState('');

  const showModal = ({ devoParagId, devoEditNote, invokedBy }) => {
    setInvokedBy(invokedBy);
    if (devoParagId && devoEditNote) {
      setdevoOpenedParagId(devoParagId);
      setdevoEditNote(devoEditNote);
    }
    setModalVisible(true);
  };
  const hideModal = () => {
    setIsDataChanged(!isDataChanged);
    setModalVisible(false);
  };

  //fetch notes for this devo and set state
  useEffect(() => {
    database()
      .ref(`/users/${userUid}/articles/${devoId}/notes`)
      .once('value')
      .then((val) => {
        if (val.val()) setdevoNotes(val.val());
      });
  }, [devoId, userUid, isDataChanged]);

  //set current devo id state and populate article read field in DB
  useEffect(() => {
    if (user) {
      dispatch({
        type: actionTypes.SET_CURRENT_DEVOTIONAL_ID,
        payload: devoId,
      });
      try {
        const userArticlesRef = database().ref(
          `/users/${userUid}/articles`,
        );
        userArticlesRef.child(devoId).update({ read: true });
      } catch (error) {
        console.log('DevotionalTab useEffect');
        console.log('Error: ', error.message);
      }
    }
  }, [devoId, dispatch, user, userUid]);

  const renderItem = (props) => {
    let currentNoteText = '';
    if (devoNotes[props.item.id]) {
      currentNoteText = devoNotes[props.item.id].text;
    }
    return (
      <DevotionalNote
        {...props}
        editNote={currentNoteText}
        showModal={showModal}
        setCurrentParagraphHTML={setCurrentParagraphHTML}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomAddNoteModal
        articleType="devotional"
        modalEditText={devoEditNote}
        devoOpenedParagId={devoOpenedParagId}
        invokedBy={invokedBy}
        modalVisible={modalVisible}
        hideModal={hideModal}
        placeholder="Your Note"
        HTML={currentParagraphHTML}
      />
      <FlatList
        ListHeaderComponent={
          <DevotionalHeader
            headLine={devoContent[0]?.headline || ''}
            imageUrl={devoContent[0]?.image.url || ''}
          />
        }
        initialNumToRender={8}
        maxToRenderPerBatch={10}
        data={PARAGRAPHSDATA}
        renderItem={renderItem}
        keyExtractor={(paragraph) => paragraph.id}
        style={styles.flatList}
      />
    </View>
  );
}

export default DevotionalTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: { marginBottom: 15 },
});
