import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DevotionalTab from '../screens/devotional-tab-screen/devotional.tab.screen';
import LazyPlaceholder from './components/lazy-placeholder.component';

const { Navigator, Screen } = createStackNavigator();

function CustomPushScreensStack() {
  return (
    <Navigator headerMode="none">
      <Screen
        name="Devotional"
        component={DevotionalTab}
        lazy
        lazyPlaceholder={() => <LazyPlaceholder />}
      />
    </Navigator>
  );
}

export default CustomPushScreensStack;
