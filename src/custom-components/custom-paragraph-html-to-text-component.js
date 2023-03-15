import React from 'react';
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
} from 'react-native';
import HTML from 'react-native-render-html';

function CustomParagraphHtmlToText({ paragraphHtml }) {
  const contentWidth = useWindowDimensions().width;
  // create custom element to replace sup tag
  const renderers = {
    sup: (htmlAttribs, children, convertedCSSStyles, passProps) => {
      const supTagText = passProps.domNode.children[0].data;
      return (
        <View
          style={styles.supContainer}
          key={passProps.key}
          html={htmlAttribs}
        >
          <Text style={styles.supText}>{supTagText} </Text>
        </View>
      );
    },
  };

  return (
    <View>
      <HTML
        // fix "react-native-render-html Please provide the html or uri prop" warning
        // by loading empty p tag
        source={{
          html: paragraphHtml || '<p></p>',
        }}
        contentWidth={contentWidth}
        renderers={renderers}
        // custom styling for rich text elements
        tagsStyles={{
          p: { color: 'black' },
          h2: { color: 'black', margin: 5 },
        }}
      />
    </View>
  );
}

export default CustomParagraphHtmlToText;

const styles = StyleSheet.create({
  supContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  supText: {
    fontSize: 11,
    lineHeight: 14,
    textAlignVertical: 'top',
  },
  paragraphContainer: { flex: 1, borderWidth: 2 },
  paragraphText: {
    color: 'red',
  },
});
