import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import TopTabsSermonStack from './TopTabsSermonStack';
import TopTabsStack from './TopTabsStack';
import CustomPushScreensStack from './CustomPushScreensStack';
// Currently not used
// import NonLoggedInModal from './components/non-logged-in-modal';

const { Navigator, Screen } = createStackNavigator();

function RootStack() {
  return (
    <Navigator mode="modal" headerMode="none">
      <Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Screen name="TopTabsStack" component={TopTabsStack} />
      <Screen
        name="TopTabsSermonStack"
        component={TopTabsSermonStack}
      />
      <Screen
        name="CustomPushScreensStack"
        component={CustomPushScreensStack}
        headerShown={false}
      />
      {/* Currently not used */}
      {/* <Screen name="NotLoggedInModal" component={NonLoggedInModal} /> */}
    </Navigator>
  );
}

export default RootStack;
