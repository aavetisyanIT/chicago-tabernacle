import React from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { AppContext } from './../context/app.context';
import { actionTypes } from './../context/action.types';
import devEnvironmentVariables from './../config/env';

const AuthProvider = ({ children }) => {
  const [{ user }, dispatch] = React.useContext(AppContext);

  React.useEffect(() => {
    GoogleSignin.configure({
      webClientId: devEnvironmentVariables.DEV_WEBCLIENTID,
      offlineAccess: true,
      forceConsentPrompt: true,
      hostedDomain: '',
      accountName: '',
    });
  }, []);

  //populate database when user logs in
  const onAuthStateChanged = React.useCallback(
    ({ uid, email }) => {
      try {
        dispatch({
          type: actionTypes.SET_USER_UID,
          payload: uid,
        });
        const usersRef = database().ref(`/users`);
        usersRef
          .child(uid)
          .update({ email: email, firebaseUid: uid });
      } catch (error) {
        console.log('AuthProvide onAuthStateChanged');
        console.log('Error: ', error.message);
      }
    },
    [dispatch],
  );

  React.useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
    // return user;
  }, [onAuthStateChanged]);

  const onGoogleSignInPress = async () => {
    try {
      if (!user) {
        await GoogleSignin.hasPlayServices({
          showPlayServicesUpdateDialog: true,
        }); // if google services are not installed propmt will pop up
        const userInfo = await GoogleSignin.signIn();
        dispatch({
          type: actionTypes.SET_USER,
          payload: userInfo.user,
        });
        dispatch({
          type: actionTypes.SET_INITIALIZING_AUTH,
          payload: false,
        });
        const googleCredential = auth.GoogleAuthProvider.credential(
          userInfo.idToken,
        );
        return auth().signInWithCredential(googleCredential);
      }
      alert(`You are already signed in with ${user.email}`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(
          `onGoogleSignInPress error: User cancelled the login flow`,
        );
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(
          `onGoogleSignInPress error: Operation google sign in is in progress already`,
        );
      } else if (
        error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
      ) {
        console.log(
          `onGoogleSignInPress error: Play services not available or outdated`,
        );
      } else {
        console.log(`onGoogleSignInPress error: ${error.message}`);
      }
    }
  };

  const onGoogleSignOutPress = async () => {
    try {
      if (user) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        dispatch({ type: actionTypes.SET_USER, payload: null });
        dispatch({
          type: actionTypes.SET_INITIALIZING_AUTH,
          payload: true,
        });
        return;
      }
      //Currently not used
      // RootNavigation.navigate('NotLoggedInModal');
    } catch (error) {
      console.log(`onGoogleSignOutPress error: ${error.message}`);
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const { user } = await GoogleSignin.signInSilently();
      dispatch({ type: actionTypes.SET_USER, payload: user });
      dispatch({
        type: actionTypes.SET_INITIALIZING_AUTH,
        payload: false,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log(
          `getCurrentUserInfo error: User is not signed in`,
        );
      } else {
        dispatch({
          type: actionTypes.SET_INITIALIZING_AUTH,
          payload: true,
        });
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        onGoogleSignInPress,
        onGoogleSignOutPress,
        getCurrentUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const AuthContext = React.createContext();
