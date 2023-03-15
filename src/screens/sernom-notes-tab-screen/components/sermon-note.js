import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  memo,
} from 'react';
import { View, StyleSheet } from 'react-native';

import HiddenText from './hidden-text';
import CustomButton from '../../../custom-components/custom-button';
import CustomParagraphHtmlToText from '../../../custom-components/custom-paragraph-html-to-text-component';
import CustomImage from '../../../custom-components/custom-image';
import { AppContext } from '../../../context/app.context';
import { actionTypes } from '../../../context/action.types';
import CustomEditButton from '../../../custom-components/custom-edit-button';

const SermonNote = ({
  item,
  showModal,
  setCurrentSermonHTML,
  editNote,
}) => {
  const [, dispatch] = useContext(AppContext);
  const [editText, setEditText] = useState();

  useEffect(() => {
    setEditText(editNote);
  }, [editNote]);

  const onAddNotePress = useCallback(() => {
    dispatch({
      type: actionTypes.SET_CURRENT_SERMON_PARAG_ID,
      payload: item.id,
    });
    showModal({
      sermonParagId: '',
      sermonEditNote: '',
      invokedBy: 'AddButton',
    });
  }, [dispatch, item, showModal]);

  let PARAGRAPHHTML = item.text;
  let paragraphContent = null;
  if (item.type === 'attributedText') {
    paragraphContent = (
      <CustomParagraphHtmlToText paragraphHtml={PARAGRAPHHTML} />
    );
  } else if (
    item.actionType === 'hiddenText' &&
    item.type === 'action'
  ) {
    paragraphContent = (
      <HiddenText text={item.text} hiddenText={item.actionString} />
    );
    // remove "%@" and add hidden text when open custom-add-note-modal for hidden-text component
    PARAGRAPHHTML = PARAGRAPHHTML.replace(
      '%@',
      ` ${item.actionString} `,
    );
  } else if (item.type === 'image') {
    paragraphContent = <CustomImage url={item.mediaObject.url} />;
  }

  return (
    <View style={styles.container}>
      {paragraphContent}
      {item.allowNotes ? (
        editText ? (
          <CustomEditButton
            editText={editText}
            showModal={showModal}
            sermonParagId={item.id}
            setCurrentSermonHTML={setCurrentSermonHTML}
            paragHTML={PARAGRAPHHTML}
          />
        ) : (
          <CustomButton
            title="Add Note"
            onPress={onAddNotePress}
            setCurrentHTML={setCurrentSermonHTML}
            currentHTML={PARAGRAPHHTML}
            style={styles.button}
            textStyle={styles.buttonText}
            icon="md-pencil"
            iconSize={18}
          />
        )
      ) : null}
    </View>
  );
};

const areEqual = (prevProp, nextProp) => {
  return nextProp.editNote === prevProp.editNote;
};

export default memo(SermonNote, areEqual);

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
