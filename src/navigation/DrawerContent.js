import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import HandHoldingHeartIcon from 'react-native-vector-icons/FontAwesome5';
import ExchangeArrowsIcon from 'react-native-vector-icons/FontAwesome5';

import * as RootNavigation from './RootNavigation';
import { AppContext } from '../context/app.context';
import CustomDrawerLoginView from '../custom-components/custom-drawer-login-view';
import { AuthContext } from '../authentication/AuthProvider';

function DrawerContent(props) {
  const [{ user, initializingAuth }] = React.useContext(AppContext);
  const { getCurrentUserInfo } = React.useContext(AuthContext);

  React.useEffect(() => {
    getCurrentUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createDrawerIcon = (name) => (
    <Icon name={name} color="black" size={22} />
  );
  const createHandHoldingHeartIcon = () => (
    <HandHoldingHeartIcon
      name="hand-holding-heart"
      color="black"
      size={22}
    />
  );
  const createExchangeArrowsIcon = () => (
    <ExchangeArrowsIcon name="exchange-alt" color="black" size={22} />
  );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0, marginTop: 0 }}
    >
      <View style={styles.drawerContent}>
        <Drawer.Section style={styles.drawerSection}>
          <CustomDrawerLoginView
            user={user}
            initializing={initializingAuth}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            label="WHAT'S NEW"
            labelStyle={{ color: 'black' }}
            icon={() => createDrawerIcon('flag')}
            onPress={() => RootNavigation.navigate("WHAT'S NEW")}
          />
          <DrawerItem
            label="SERMONS"
            labelStyle={{ color: 'black' }}
            icon={() => createDrawerIcon('bookmark')}
            onPress={() => {
              RootNavigation.navigate('SERMONS');
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            label="Prayer Request"
            labelStyle={{ color: 'black' }}
            icon={createExchangeArrowsIcon}
            onPress={() => RootNavigation.navigate('PrayrRequest')}
          />
          <DrawerItem
            label="Give"
            icon={() => createDrawerIcon('heart')}
            onPress={() =>
              Linking.openURL(
                'https://www.chicagotabernacle.org/give/',
              )
            }
          />
          <DrawerItem
            label="Ministries"
            icon={() => createDrawerIcon('people')}
            onPress={() => {
              null;
            }}
          />
          <DrawerItem
            label="Serve"
            icon={createHandHoldingHeartIcon}
            onPress={() => {
              null;
            }}
          />
          <DrawerItem
            icon={() => createDrawerIcon('location-sharp')}
            label="About"
            onPress={() => {
              null;
            }}
          />
        </Drawer.Section>
        <Drawer.Section>
          <DrawerItem
            label="Facebook"
            icon={() => createDrawerIcon('ios-logo-facebook')}
            onPress={() =>
              Linking.openURL('https://www.facebook.com/chicagotab/')
            }
          />
          <DrawerItem
            label="Instagram"
            icon={() => createDrawerIcon('ios-logo-instagram')}
            onPress={() =>
              Linking.openURL('https://www.instagram.com/chicagotab/')
            }
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  row: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
