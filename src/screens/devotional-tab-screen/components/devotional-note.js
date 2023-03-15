import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  memo,
} from 'react';
import { StyleSheet, View } from 'react-native';

import CustomButton from '../../../custom-components/custom-button';
import CustomParagraphHtmlToText from '../../../custom-components/custom-paragraph-html-to-text-component';
import { actionTypes } from '../../../context/action.types';
import { AppContext } from '../../../context/app.context';
import CustomEditButton from '../../../custom-components/custom-edit-button';

function DevotionalNote({
  item,
  showModal,
  setCurrentParagraphHTML,
  editNote,
}) {
  const [, dispatch] = useContext(AppContext);
  const [editText, setEditText] = useState();

  useEffect(() => {
    setEditText(editNote);
  }, [editNote]);

  const onAddNotePress = useCallback(() => {
    dispatch({
      type: actionTypes.SET_CURRENT_DEVOTIONAL_PARAG_ID,
      payload: item.id,
    });
    showModal({
      devoParagId: '',
      devoEditNote: '',
      invokedBy: 'AddButton',
    });
  }, [dispatch, item, showModal]);

  return (
    <View style={styles.container}>
      <CustomParagraphHtmlToText paragraphHtml={item.text} />
      {item.allowNotes ? (
        editText ? (
          <CustomEditButton
            editText={editText}
            showModal={showModal}
            devoParagId={item.id}
            setCurrentSermonHTML={setCurrentParagraphHTML}
            paragHTML={item.text}
          />
        ) : (
          <CustomButton
            title="Add Note"
            onPress={onAddNotePress}
            setCurrentHTML={setCurrentParagraphHTML}
            currentHTML={item.text}
            style={styles.button}
            textStyle={styles.buttonText}
            icon="md-pencil"
            iconSize={18}
          />
        )
      ) : null}
    </View>
  );
}

const areEqual = (prevProp, nextProp) => {
  return nextProp.editNote === prevProp.editNote;
};

export default memo(DevotionalNote, areEqual);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 5,
  },
  buttonText: { color: '#bc9665', fontSize: 15, marginHorizontal: 5 },
});
