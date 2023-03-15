import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import SermonsListTab from '../screens/sermons-list-tab-screen/sermons-list.tab.screen';
import NewsTab from '../screens/news-tab-screen/news.tab.screen';
import HomeScreenTabBar from './components/home-screen-tab-bar.component';
import LazyPlaceholder from './components/lazy-placeholder.component';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function TopTabsStack() {
  return (
    <Navigator tabBar={(props) => <HomeScreenTabBar {...props} />}>
      <Screen
        name="WHAT'S NEW"
        component={NewsTab}
        lazy
        lazyPlaceholder={() => <LazyPlaceholder />}
      />
      <Screen
        name="SERMONS"
        component={SermonsListTab}
        lazy
        lazyPlaceholder={() => <LazyPlaceholder />}
      />
    </Navigator>
  );
}

export default TopTabsStack;
