import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DevotionalTab from '../screens/devotional-tab-screen/devotional.tab.screen';
import SermonNotesTab from '../screens/sernom-notes-tab-screen/sermon-notes.tab.screen';
import SermonTabBar from './components/sermon-tab-bar.component';
import LazyPlaceholder from './components/lazy-placeholder.component';
import { AppContext } from '../context/app.context';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function TopTabsSermonStack({ route }) {
  const [state] = React.useContext(AppContext);
  const { isFullScreenVideo } = state;

  const isDevoContent =
    route.params.params.article.devoContent.length !== 0;

  return (
    // Hide header when video player is fullscreen mode
    <Navigator
      tabBar={(props) =>
        isFullScreenVideo || !isDevoContent ? null : (
          <SermonTabBar {...props} />
        )
      }
    >
      <Screen
        name="SERMON NOTES"
        component={SermonNotesTab}
        lazy
        lazyPlaceholder={() => <LazyPlaceholder />}
      />
      {/* Disable swiping to the left in fullscreen mode */}
      {isFullScreenVideo || !isDevoContent ? null : (
        <Screen
          name="DEVOTIONAL"
          component={DevotionalTab}
          lazy
          lazyPlaceholder={() => <LazyPlaceholder />}
        />
      )}
    </Navigator>
  );
}

export default TopTabsSermonStack;
