import { GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { AuthContext } from '../authentication/AuthProvider';

function CustomDrawerLoginView({ user, initializing }) {
  const { onGoogleSignInPress, onGoogleSignOutPress } =
    React.useContext(AuthContext);
  const isloggedIn = user && !initializing;

  return (
    <View style={styles.container}>
      <Avatar.Image
        source={
          isloggedIn
            ? { uri: user.photo }
            : require('../assets/demo_icon.png')
        }
        size={45}
        style={styles.icon}
      />
      {isloggedIn ? (
        <Button
          mode="outlined"
          color="#787879"
          uppercase
          onPress={onGoogleSignOutPress}
        >
          Sign Out
        </Button>
      ) : (
        <GoogleSigninButton
          onPress={onGoogleSignInPress}
          style={styles.googleSignInButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
        />
      )}
    </View>
  );
}

export default CustomDrawerLoginView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 12,
    paddingTop: 15,
  },
  icon: {
    marginBottom: 15,
  },
  googleSignInButton: { width: '80%', height: 48 },
});
