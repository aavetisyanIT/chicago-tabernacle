import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

import DrawerContent from './DrawerContent';
import TopTabsStack from './TopTabsStack';
import SideMenuButton from './components/side-menu-button';
import TopTabsSermonStack from './TopTabsSermonStack';
import PrayerRequestScreen from './../screens/prayer-request-screen/prayer-request.screen';
import { AppContext } from './../context/app.context';

const { Navigator, Screen } = createStackNavigator();

const DrawerStack = ({ route }) => {
  const [state] = React.useContext(AppContext);
  const { isFullScreenVideo } = state;

  const getHeaderTitle = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    switch (routeName) {
      case 'Home':
        return 'CHICAGO TABERNCLE';
      case 'PrayrRequest':
        return 'PRAYER REQUEST';
      case 'TopTabsSermonStack':
        return 'SERMON NOTES';
    }
  };
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#fff' },
        headerLeftContainerStyle: {
          marginLeft: '1%',
        },
        headerTitleStyle: {
          display: 'flex',
          flex: 1,
          fontFamily: 'Roboto-Light',
          textAlign: 'center',
          marginRight: '15%',
        },
      }}
    >
      <Screen
        name="Home"
        component={TopTabsStack}
        options={{
          title: getHeaderTitle(route),
          headerLeft: () => <SideMenuButton />,
        }}
      />
      <Screen
        name="PrayrRequest"
        component={PrayerRequestScreen}
        options={{
          title: getHeaderTitle(route),
          headerLeft: () => <SideMenuButton />,
        }}
      />
      <Screen
        name="TopTabsSermonStack"
        component={TopTabsSermonStack}
        options={{
          //hide header when video player is fullscreen mode
          headerShown: isFullScreenVideo ? false : true,
          title: getHeaderTitle(route),
          headerLeft: () => <SideMenuButton />,
        }}
      />
    </Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [state] = React.useContext(AppContext),
    { isFullScreenVideo } = state;
  return (
    <Drawer.Navigator drawerContent={() => <DrawerContent />}>
      <Drawer.Screen
        name="Home"
        component={DrawerStack}
        headerMode="none"
        // Stop side menu from sliding out when in fullscreen mode
        options={{ swipeEnabled: isFullScreenVideo ? false : true }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
